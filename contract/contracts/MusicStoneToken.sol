
pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "../contracts/token/KIP7/KIP7Token.sol";
import "../contracts/ownership/Ownable.sol";
contract MusicStoneToken is KIP7Token, Ownable{
    constructor() KIP7Token("MusicStoneToken", "MTK", 18, 999999999*1000*10**18) public {
    }
}

// import "../contracts/token/KIP7/KIP7Mintable.sol";
// import "../contracts/token/KIP7/KIP7Burnable.sol";
// import "../contracts/token/KIP7/KIP7Pausable.sol";
// import "../contracts/token/KIP7/KIP7Metadata.sol";
// import "../contracts/lifecycle/SelfDestructible.sol";
// import "../contracts/ownership/Ownable.sol";

// contract MusicStoneToken is KIP7Mintable, KIP7Burnable, KIP7Pausable, KIP7Metadata, Ownable, SelfDestructible {
//     constructor() KIP7Metadata("MusicStoneToken", "MTK", 18) public {
//         // _mint(address(this), 1000*10**18);
//         _mint(msg.sender, 1000*10**18);
//     }
// }

// pragma solidity ^0.5.6;

// import "hardhat/console.sol";
// import "../contracts/token/KIP7/KIP7TokenFull.sol";

// contract MusicStoneToken is KIP7Mintable, KIP7Burnable, KIP7Pausable, KIP7Metadata, Ownable, SelfDestructible{
//     mapping (address => uint) public mstoken;

//     constructor() public KIP7TokenFull("MusicStoneToken", "MTK", 18, 1*10**18) {
//         // console.log("mst ",address(this));
//         transfer(address(this), totalSupply());
//         console.log("🚀 ~ file: MusicStoneToken.sol ~ line 13 ~ constructor ~ balanceOf", balanceOf(address(this)));
        
//     }

//     // Allow anyone to purchase token
//     function purchase(uint amount) public payable {
//         console.log(address(this));
//         console.log(amount, msg.value);
//         require(msg.value >= amount * 1 ** 18, "You must pay at least 1 ETH per cupcake");
//         require(mstoken[address(this)] >= amount, "Not enough token in stock to complete this purchase");
//         mstoken[address(this)] -= amount;
//         mstoken[msg.sender] += amount;
//     }
//     function purchase2() public payable {
//         uint256 _amount = msg.value * 10;
//         console.log(owner(), _amount, msg.value, balanceOf(owner()));
//         console.log(address(this));
//         require(msg.value > 0, "You must pay at least 1 ETH per cupcake");
//         require(balanceOf(owner()) >= _amount, "Not enough token in stock to complete this purchase");
//         transfer(msg.sender, _amount);
//     }
// }
// contract KIP7Basic is IKIP7 {

//     string public constant name = "MusicStoneToken";
//     string public constant symbol = "MTK";
//     uint8 public constant decimals = 18;


//     event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
//     event Transfer(address indexed from, address indexed to, uint tokens);


//     mapping(address => uint256) balances;

//     mapping(address => mapping (address => uint256)) allowed;

//     uint256 totalSupply_ = 100 ether;

//     using SafeMath for uint256;

//    constructor() public {
//     balances[msg.sender] = totalSupply_;
//     }

//     function totalSupply() public view returns (uint256) {
//     return totalSupply_;
//     }

//     function balanceOf(address tokenOwner) public view returns (uint256) {
//         return balances[tokenOwner];
//     }

//     function transfer(address receiver, uint256 numTokens) public returns (bool) {
//         require(numTokens <= balances[msg.sender]);
//         balances[msg.sender] = balances[msg.sender].sub(numTokens);
//         balances[receiver] = balances[receiver].add(numTokens);
//         emit Transfer(msg.sender, receiver, numTokens);
//         return true;
//     }

//     function approve(address delegate, uint256 numTokens) public returns (bool) {
//         allowed[msg.sender][delegate] = numTokens;
//         emit Approval(msg.sender, delegate, numTokens);
//         return true;
//     }

//     function allowance(address owner, address delegate) public view returns (uint) {
//         return allowed[owner][delegate];
//     }

//     function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
//         require(numTokens <= balances[owner]);
//         require(numTokens <= allowed[owner][msg.sender]);

//         balances[owner] = balances[owner].sub(numTokens);
//         allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
//         balances[buyer] = balances[buyer].add(numTokens);
//         emit Transfer(owner, buyer, numTokens);
//         return true;
//     }
//     function safeTransfer(address recipient, uint256 amount, bytes memory data) public{

//     }
//     function safeTransfer(address recipient, uint256 amount) public{

//     }
//     function safeTransferFrom(address sender, address recipient, uint256 amount, bytes memory data) public{

//     }
//     function safeTransferFrom(address sender, address recipient, uint256 amount) public{

//     }
//     function supportsInterface(bytes4 interfaceId) external view returns (bool){

//     }
// }