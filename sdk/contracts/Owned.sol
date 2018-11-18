pragma solidity ^0.4.24;

/**
 * The Owned contract: Used to store the owner of a contract
 */
contract Owned {

    address public owner;

    /**
     * @dev constructs a new Owned contract and sets owner
     */
    function Owned() public {
        owner = msg.sender;
    }

    /**
     * @dev changes the owner
     * @param _newOwner the address of the new owner
     */
    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
