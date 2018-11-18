pragma solidity ^0.4.24;

/**
 * The Created contract: Used to mark the creation times of contracts
 */

contract Created {

    uint public created;

    /**
     * @dev constructs a new Created contract and sets creations time to `now`
     */
    function Created() public {
        created = now;
    }
}
