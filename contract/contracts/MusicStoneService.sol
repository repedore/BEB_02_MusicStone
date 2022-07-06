
pragma solidity ^0.5.6;
pragma experimental ABIEncoderV2;       // struct return

import "hardhat/console.sol";
import "../contracts/ownership/Ownable.sol";
import "../contracts/token/KIP7/IKIP7.sol";
import "./access/roles/MinterRole.sol";
import "./math/SafeMath.sol";
import "./drafts/Counters.sol";
import "./MusicStoneSFT.sol";
import "./MusicStoneToken.sol";
import "./token//KIP37/KIP37Holder.sol";
// import "./token/MusicStone/UserId.sol";

contract MusicStoneService is Ownable, MinterRole, KIP37Holder{
    using SafeMath for uint;
    using Address for address;
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsClosed;

    uint tokenRatio = 500;       // 1klay => 1000 mstoken
    MusicStoneToken public mstoken;
    MusicStoneSFT public mssft;

    struct UserSFT{
        // address account;
        uint id;
        uint balance;
        uint totalSupply;
    }

    // 예치
    mapping(address=>uint) private _deposit_balance;
    // 분배받은 토큰
    mapping(address=>uint) private _distribution_balance;

    /** [모든 유저 - 수량이 0 이 되면 제거됨]
    user1 address    =>     [0, 2, 4, ...]
    user2 address    =>     [1, 3, 5, ...]
                      .
     */
    mapping(address => uint[]) private _user_sft_list;
    mapping(uint => address[]) private _sft_user_list;

    /** [모든 유저]
    user1 address     =>     0     =>     1234
                      =>     1     =>     0
                      =>     2     =>     100
    user2 address     =>     0     =>     0
                      =>     1     =>     1111
                      =>     2     =>     100
                      .
                      .
                      .
     */
    mapping(address => mapping(uint => uint)) private _user_sft_balances;
    mapping(address => mapping(uint => uint)) private _user_sft_marketopened_balances;

    /** [창작자]
    creator1 address  =>     [0, 2, 4, ...]
    creator2 address  =>     [1, 3, 5, ...]
                      .
                      .
                      .
     */
    mapping(address => uint[]) private _creator_sft_list;

    /** [창작자]
    0                 =>     creator1 address
    1                 =>     creator2 address
    2                 =>     creator1 address
    3                 =>     creator2 address
                      .
                      .
                      .
     */
    mapping(uint => address) private _sft_creator;

    /** [각 토큰 총 공급량]
    0                 =>     1234
    1                 =>     1111k
    2                 =>     1000
                      .
                      .
                      .
     */
    mapping(uint => uint) private _sft_totalSupply;


    struct MarketItem{
        uint itemId;
        uint tokenId;
        address payable seller;
        uint unit_price;
        uint total_amount;
        uint remaining_amount;
        bool isOpened;
    }
    // Market id => MarketItem struct
    mapping(uint => MarketItem) private idToMarketItem;
    event MarketItemCreated (
        uint indexed itemId,
        uint indexed tokenId,
        address seller,
        uint unit_price,
        uint total_amount,
        uint remaining_amount
    );
    event MarketItemSelled (
        uint indexed itemId,
        uint indexed tokenId,
        address seller,
        address buyer,
        uint unit_price,
        uint total_amount,
        uint buy_amount,
        uint remaining_amount
    );
    event MarketItemCancel (
        uint indexed itemId,
        uint indexed tokenId,
        address seller,
        uint unit_price,
        uint total_amount,
        uint remaining_amount
    );
    event BuyToken (
        address user,
        uint amount
    );
    event SellToken (
        address user,
        uint amount
    );
    event SFTMinted (
        address artist,
        uint token_id,
        uint amount
    );
    event DepositMSToken (
        address user,
        uint amount
    );
    event WithDrawalDepositMSToken (
        address user,
        uint amount
    );
    event WithDrawalDistributionMSToken (
        address user,
        uint amount
    );

    uint listingPrice = 0.1 ether;
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor () public {
    }
    
    function setToken(address _token) public onlyOwner {
        mstoken = MusicStoneToken(_token);
    }

    function setSFT(address _token) public onlyOwner {
        mssft = MusicStoneSFT(_token);
    }

    function getAllowance() public view returns(uint) {
        return mstoken.allowance(owner(), address(this));
    }

    function setTokenRatio(uint _newTokenRatio) public onlyOwner {
        tokenRatio = _newTokenRatio;
    }

    function getTokenRatio() public view returns(uint) {
        return tokenRatio;
    }

    function withdraw() public payable onlyOwner {
        require(msg.sender.send(address(this).balance));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // 토큰구매
    function buyToken() public payable {
        // uint _amount = msg.value * tokenRatio;
        // uint allowance = mstoken.allowance(owner(), address(this));
        // require(msg.value > 0, "You must pay at least 1 Klay");
        // require(allowance >= _amount, "Service MSToken is insufficient.");
        // _safeTokenTransferFrom(owner(), msg.sender, _amount);

        uint _amount = msg.value * tokenRatio;
        require(msg.value > 0, "You must pay at least 1 Klay");
        mstoken.mint(msg.sender, _amount);
        emit BuyToken(msg.sender, _amount);
    }

    // 토큰판매
    function sellToken(uint _amount) public payable {
        // uint _klay_amount = _amount / tokenRatio;
        // require(mstoken.allowance(msg.sender, address(this)) >= _amount, "mstoken allowance too low");
        // require(address(this).balance >= _klay_amount, "Klay too low");
        // _safeTokenTransferFrom(msg.sender, owner(), _amount);
        // require(msg.sender.send(_klay_amount));
        // emit SellToken(msg.sender, _amount);

        uint _klay_amount = _amount / tokenRatio;
        require(address(this).balance >= _klay_amount, "Klay too low");
        mstoken.burnFrom(msg.sender, _amount);
        require(msg.sender.send(_klay_amount));
        emit SellToken(msg.sender, _amount);
    }

    // Minter(Artist)의 SFT Mint
    function mintSFT(uint _amount) public onlyMinter {
        mssft.mintMusicStone(msg.sender, _amount);
        uint id = mssft.getNowId();
        _creator_sft_list[msg.sender].push(id);
        _sft_creator[id] = msg.sender;
        _sft_totalSupply[id] = _sft_totalSupply[id].add(_amount);

        _addUserSFTList(msg.sender, id, _amount);
        emit SFTMinted(msg.sender, id, _amount);
    }

    // sft의 totalSupply
    function totalSFTSupply(uint _id) public view returns (uint) {
        return _sft_totalSupply[_id];
    }

    // Artist의 SFT list
    function getArtistSfts(address _account) public view returns(uint[] memory){
        require(
            _account != address(0),
            "KIP37: balance query for the zero address"
        );
        return _creator_sft_list[_account];
    }

    // SFT의 Artist
    function getSftCreator(uint _id) public view returns (address){
        return _sft_creator[_id];
    }

    // address 가 가지고있는(시장등록 수량 포함) id의 sft의 개수
    function getUserSFTs(address _account, uint _token_id) public view returns(uint){
        return _user_sft_balances[_account][_token_id];
    }
    // address 가 시장에 등록할 수 있는 id의 sft의 개수
    function getUserCanSellBalances(address _address, uint _tokenId) public view returns (uint){
        return _user_sft_balances[_address][_tokenId] - _user_sft_marketopened_balances[_address][_tokenId];
    }
    // address 가 시장에 등록한 id의 sft의 개수
    function getUserMarketOpenedBalances(address _address, uint _tokenId) public view returns (uint){
        return _user_sft_marketopened_balances[_address][_tokenId];
    }

    // 
    function getUserAllSFTs(address _account) public view returns(UserSFT[] memory){
        uint _id_length = _user_sft_list[_account].length;
        UserSFT[] memory user_sfts = new UserSFT[](_id_length);
        
        for(uint i = 0; i < _id_length; i++){
            uint id = _user_sft_list[_account][i];
            user_sfts[i].id = id;
            user_sfts[i].balance = _user_sft_balances[_account][id];
            user_sfts[i].totalSupply = totalSFTSupply(id);
        }
        
        return user_sfts;
    }
    function getUsersAllSFTs(address[] memory _account) public view returns(UserSFT[][] memory){
        uint _user_length = _account.length;

        UserSFT[][] memory users_sfts = new UserSFT[][](_user_length);
        for(uint i = 0; i < _user_length; i++){
            uint _id_length = _user_sft_list[_account[i]].length;
            users_sfts[i] = new UserSFT[](_id_length);
        }

        for(uint i = 0; i < _user_length; i++){
            uint _id_length = _user_sft_list[_account[i]].length;
            for(uint j = 0; j < _id_length; j++){
                uint id = _user_sft_list[_account[i]][j];
                users_sfts[i][j].id = id;
                users_sfts[i][j].balance = _user_sft_balances[_account[i]][id];
                users_sfts[i][j].totalSupply = totalSFTSupply(id);
            }
        }
        
        return users_sfts;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function getMarketItemById(uint marketItemId) public view returns (MarketItem memory) {
        MarketItem memory item = idToMarketItem[marketItemId];
        return item;
    }

    function addItemToMarket(uint tokenId, uint unit_price, uint amount) public payable {
        require(unit_price > 0, "Price must be at least 1 wei");
        // require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint itemId = _itemIds.current();
    
        idToMarketItem[itemId] =  MarketItem(
            itemId,
            tokenId,
            msg.sender,
            unit_price,
            amount,
            amount,
            true
        );

        mssft.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        _increase_user_sft_marketopened_balances(msg.sender, tokenId, amount);

        emit MarketItemCreated(
            itemId,
            tokenId,
            msg.sender,
            unit_price,
            amount,
            amount
        );
    }

    function purchaseItem(uint itemId, uint buy_amount) public payable {
        bool isOpened = idToMarketItem[itemId].isOpened;
        require(isOpened == true, "This MarketItem is closed.");
        uint tokenId = idToMarketItem[itemId].tokenId;
        uint unit_price = idToMarketItem[itemId].unit_price;
        uint remaining_amount = idToMarketItem[itemId].remaining_amount;
        require(remaining_amount >= buy_amount, "The purchase volume is larger than the remaining quantity.");
        require(msg.value == unit_price * buy_amount, "The purchase price and sales price are different.");

        idToMarketItem[itemId].seller.transfer(msg.value);
        idToMarketItem[itemId].remaining_amount = idToMarketItem[itemId].remaining_amount.sub(buy_amount);

        if(idToMarketItem[itemId].remaining_amount == 0){
            _itemClose(itemId);
        }
        _subOwnerSFTList(idToMarketItem[itemId].seller, tokenId, buy_amount);
        _addUserSFTList(msg.sender, tokenId, buy_amount);
        mssft.safeTransferFrom(address(this), msg.sender, tokenId, buy_amount, "");

        emit MarketItemSelled(
            itemId,
            tokenId,
            idToMarketItem[itemId].seller,
            msg.sender,
            unit_price,
            idToMarketItem[itemId].total_amount,
            buy_amount,
            idToMarketItem[itemId].remaining_amount
        );
        // owner.transfer(listingPrice);
    }

    function cancelItem(uint itemId) public {
        address seller = idToMarketItem[itemId].seller;
        uint tokenId = idToMarketItem[itemId].tokenId;
        uint remaining_amount = idToMarketItem[itemId].remaining_amount;
        
        require(seller == msg.sender, "Only Seller can cancel.");

        mssft.safeTransferFrom(address(this), msg.sender, tokenId, remaining_amount, "");
        _itemClose(itemId);
        _decrease_user_sft_marketopened_balances(msg.sender, tokenId, remaining_amount);

        emit MarketItemCancel(
            itemId,
            tokenId,
            idToMarketItem[itemId].seller,
            idToMarketItem[itemId].unit_price,
            idToMarketItem[itemId].total_amount,
            idToMarketItem[itemId].remaining_amount
        );
    }

    function getUnsoldItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsClosed.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].isOpened) {
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
    
        return items;
    }

    function getItemsBySeller(address _seller) public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == _seller) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == _seller) {
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
    
        return items;
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 예치
    function depositMSToken(uint _amount) public {
        // _safeTokenTransferFrom(msg.sender, address(this), _amount);
        mstoken.transferFrom(msg.sender, address(this), _amount);
        _deposit_balance[msg.sender] = _deposit_balance[msg.sender].add(_amount);
        emit DepositMSToken(msg.sender, _amount);
    }

    function getUserDeposit(address _address)public view returns(uint){
        return _deposit_balance[_address];
    }
    function getUserDistribution(address _address)public view returns(uint){
        return _distribution_balance[_address];
    }

    // 인출(예치)
    function withdrawalDeposit(uint _amount) public {
        // 7일 락업
        require(_deposit_balance[msg.sender] >= _amount, "Not Enough Deposit balance");
        _deposit_balance[msg.sender] = _deposit_balance[msg.sender].sub(_amount);
        // _safeTokenTransferFrom(address(this), msg.sender, _amount);
        mstoken.safeTransfer(msg.sender, _amount);
        emit WithDrawalDepositMSToken(msg.sender, _amount);
    }
    // 인출(분배)
    function withdrawalDistribution(uint _amount) public {
        require(_distribution_balance[msg.sender] >= _amount, "Not Enough Distribution balance");
        _distribution_balance[msg.sender] = _distribution_balance[msg.sender].sub(_amount);
        // _safeTokenTransferFrom(address(this), msg.sender, _amount);
        mstoken.safeTransfer(msg.sender, _amount);
        emit WithDrawalDistributionMSToken(msg.sender, _amount);
    }

    // 차감 (총 balance 필요한지?)
    function deduction(address[] memory _address, uint[] memory _deduct_token) public {
        uint addr_length = _address.length;
        uint token_length = _deduct_token.length;
        require(addr_length == token_length, "The length is different.");

        for(uint i = 0; i < addr_length; i++){
            _deposit_balance[_address[i]] = _deposit_balance[_address[i]].sub(_deduct_token[i]);
        }
    }


    // _distribute_amount 단위 주의
    function distribution(uint[] memory _sft_token, uint[] memory _distribute_amount) public {
        uint _sft_token_length = _sft_token.length;
        uint _distribute_amount_length = _distribute_amount.length;
        require(_sft_token_length == _distribute_amount_length, "The length is different.");

        for(uint i = 0; i < _sft_token_length; i++){
            uint sft_id = _sft_token[i];
            address[] memory sft_users = _sft_user_list[sft_id];
            uint total_sft = _sft_totalSupply[sft_id];
            for(uint j = 0; j < sft_users.length; j++){
                address account = sft_users[j];
                uint user_sft_balance = _user_sft_balances[account][sft_id];
                uint _d_balance = _distribute_amount[i] * user_sft_balance / total_sft;
                _distribution_balance[account] = _distribution_balance[account].add(_d_balance);
            }
        }
        // 주소 먼저
        // for(uint i = 0; i < UserId.getNowUserCount(); i++){
        //     address addr = UserId.getUserAddress(i);
        //     uint[] memory sft_list = _user_sft_list[addr];
        //     for(uint j = 0; j < sft_list.length; j++){
        //         uint sft_id = sft_list[j];
        //         uint total_sft = _sft_totalSupply[sft_id];

        //     }
        // }
    }
    // 분배
    // function distributionByAddress(address[] memory _address, uint[] memory _distribute_token) public {
    //     uint addr_length = _address.length;
    //     uint token_length = _distribute_token.length;
    //     require(addr_length == token_length, "The length is different.");

    //     for(uint i = 0; i < addr_length; i++){
    //         _distribution_balance[_address[i]] = _distribution_balance[_address[i]].add(_distribute_token[i]);
    //     }
    // }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function _addUserSFTList(address _address, uint _tokenId, uint _amount) private {
        if(_getUserSFTIndex(_address, _tokenId) == -1){
            _user_sft_list[_address].push(_tokenId);
            _sft_user_list[_tokenId].push(_address);
        }
        _user_sft_balances[_address][_tokenId] = _user_sft_balances[_address][_tokenId].add(_amount);
    }
    function _subOwnerSFTList(address _address, uint _tokenId, uint _amount) private {
        require(_user_sft_balances[_address][_tokenId] >= _amount, "User SFT Balances is less.");
        _user_sft_balances[_address][_tokenId] = _user_sft_balances[_address][_tokenId].sub(_amount);

        if(_user_sft_balances[_address][_tokenId] == 0){
            uint index1 = uint(_getUserSFTIndex(_address, _tokenId));
            require(index1 >= 0, "Wrong Index(_getUserSFTIndex).");
            _user_sft_list[_address][index1] = _user_sft_list[_address][_user_sft_list[_address].length - 1];
            _user_sft_list[_address].pop();

            uint index2 = uint(_getSFTUserIndex(_address, _tokenId));
            require(index2 >= 0, "Wrong Index(_getSFTUserIndex).");
            _sft_user_list[_tokenId][index2] = _sft_user_list[_tokenId][_sft_user_list[_tokenId].length - 1];
            _sft_user_list[_tokenId].pop();
        }
    }

    function _increase_user_sft_marketopened_balances(address _address, uint _tokenId, uint _increase_balance) private {
        require(_user_sft_balances[_address][_tokenId] >= _user_sft_marketopened_balances[_address][_tokenId] + _increase_balance, "User SFT Balances is less.");
        _user_sft_marketopened_balances[_address][_tokenId] = _user_sft_marketopened_balances[_address][_tokenId].add(_increase_balance);
    }

    function _decrease_user_sft_marketopened_balances(address _address, uint _tokenId, uint _decrease_balance) private {
        _user_sft_marketopened_balances[_address][_tokenId] = _user_sft_marketopened_balances[_address][_tokenId].sub(_decrease_balance);
    }

    function _itemClose(uint _itemId) private{
        _itemsClosed.increment();
        idToMarketItem[_itemId].isOpened = false;
    }
    // User 에서 sft list 찾기
    function _getUserSFTIndex(address _address, uint _tokenId) private view returns(int) {
        uint _length = _user_sft_list[_address].length;
        for(uint i = 0; i < _length; i++){
            uint sft_id = _user_sft_list[_address][i];
            if(_tokenId == sft_id){
                return int(i);
            }
        }
        return -1;
    }
    // sft 에서 User 찾기
    function _getSFTUserIndex(address _address, uint _tokenId) private view returns(int) {
        uint _length = _sft_user_list[_tokenId].length;
        for(uint i = 0; i < _length; i++){
            address account = _sft_user_list[_tokenId][i];
            if(_address == account){
                return int(i);
            }
        }
        return -1;
    }

    // function _safeTokenTransferFrom(
    //     address _sender,
    //     address _recipient,
    //     uint _amount
    // ) private {
    //     bool sent = mstoken.transferFrom(_sender, _recipient, _amount);
    //     require(sent, "mstoken transfer failed");
    // }

// db에는 유저의 차감토큰, 어떤곡이 토큰을 얼마나 가지는지 저장됨.
// 주소, 예치
// 무제한 민팅?
// 승인신청 한번만?
// 락업
// 
}