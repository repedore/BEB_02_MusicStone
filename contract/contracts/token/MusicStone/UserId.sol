pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "../../drafts/Counters.sol";

contract UserId {
    using Counters for Counters.Counter;
    Counters.Counter private _user_count;

    mapping(address => bool) public is_registered_user_id;
    mapping(address => uint) public user_id;
    mapping(uint => address) public user_address;

    modifier isRegistered() {
        if(is_registered_user_id[msg.sender] == false){
            _user_count.increment();
            user_id[msg.sender] = _user_count.current();
            user_address[_user_count.current()] = msg.sender;
            is_registered_user_id[msg.sender] = true;
        }
        _;
    }

    function getUserId(address _address) public view returns(uint){
        return user_id[_address];
    }
    function getUserAddress(uint id) public view returns(address){
        return user_address[id];
    }

    function getNowUserCount() public view returns(uint){
        return _user_count.current();
    }
}
