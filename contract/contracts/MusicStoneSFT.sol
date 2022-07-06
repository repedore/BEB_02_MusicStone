pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "./token/MusicStone/KIP37_.sol";
import "./drafts/Counters.sol";
// import "./IMusicStone.sol";

contract MusicStoneSFT is KIP37_ {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    event SFTMinted (
        address _account,
        uint256 nowId,
        uint256 _amount
    );

    // mapping(uint256 => mapping(address => uint256)) private _balances_ratio;
    mapping(address => uint256[]) _artist_song;
    Counters.Counter private _now_id;

    constructor(string memory uri) public KIP37_(uri) {
        // mintMusicStone(99);
    }

    function setSFTURI (string memory newuri) public onlyAuthorized{
        _setURI(newuri);
    }

    function getSFTURI() public view returns(string memory){
        return _uri;
    }

    function mintMusicStoneOnwer(address _address, uint256 _id, uint256 _amount) public onlyAuthorized{
        _mint(_address, _id, _amount, "");

        emit SFTMinted(
            _address,
            _id,
            _amount
        );
    }

    function mintMusicStone(address _account, uint256 _amount) public onlyAuthorized{
        _now_id.increment();
        uint256 nowId = _now_id.current();
        console.log("SFT - mintMusicStone", nowId, _account, _amount);
        _artist_song[_account].push(nowId);
        _mint(_account, nowId, _amount, "");

        emit SFTMinted(
            _account,
            nowId,
            _amount
        );
    }
    function getNowId() public view returns(uint256) {
        return _now_id.current();
    }

    // function removeMusicStone(uint256 _index, uint256 _amount) public onlyAuthorized{
    //     uint256 _length = _artist_song[msg.sender].length;
    //     uint256 _id = _artist_song[msg.sender][_index];
    //     _artist_song[msg.sender][_index] = _artist_song[msg.sender][_length - 1];
    //     _artist_song[msg.sender].pop();
    //     _burn(msg.sender, _id, _amount);
    // }
}
