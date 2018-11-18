pragma solidity ^0.4.24;

/**
 * The Timelocked contract: Used to specify a contract has an expirationDate
 */
contract Timelocked {
    
    uint public expirationDate;

    function notExpired() public view returns (bool) {
        return now < expirationDate;
    }
}
