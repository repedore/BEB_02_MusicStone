pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "./MusicStoneToken.sol";
contract DEX{
    mapping(address => uint) _balances;

    MusicStoneToken _mstoken;

    constructor(address _token) public payable{
        // console.log("DEX", _token);
        _mstoken = MusicStoneToken(_token);
    }

    function setMSToken(address _token) public {
        _mstoken = MusicStoneToken(_token);
    }
    
    function invest() external payable{
        if(msg.value < 1000){
            revert();
        }
        _balances[msg.sender] += msg.value;
        bool sent = _mstoken.transferFrom(address(this), msg.sender, 1000);
        console.log(sent);
        require(sent, "Token transfer failed");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}