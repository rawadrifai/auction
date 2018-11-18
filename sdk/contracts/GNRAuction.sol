pragma solidity ^0.4.21;

import { Owned } from "./Owned.sol";
import { Created } from "./Created.sol";
import { Timelocked } from "./Timelocked.sol";
import { SafeMath } from "./SafeMath.sol";


/**
 * The Swap contract: This is the swap contract
 */
contract GNRAuction is Owned, Created, Timelocked {

    using SafeMath for uint;

    string public itemTitle;
    string public description;
    string public itemType;
    uint public quantity;
    uint public listingPrice;
    string public listingPriceCurrency;
    uint public bidPrice;
    string public bidPriceCurrency;
    uint public maxBids;
    address[] bidders;
    uint currentBidCount;

    /**
     * @dev Constructs a new GNRAuction
     * @param _itemTitle item title
     * @param _description item description
     * @param _itemType the type of the item 
     * @param _quantity item quantity
     * @param _listingPrice the price of the item
     * @param _listingPriceCurrency currency of listing price
     * @param _bidPrice the price of the bid
     * @param _bidPriceCurrency currency of bid price
     */
    constructor(
        string _itemTitle, string _description, string _itemType, uint _quantity, uint _listingPrice, string _listingPriceCurrency, uint _bidPrice, string _bidPriceCurrency, uint _maxBids
    )
    public
    {
        itemTitle = _itemTitle;
        description = _description;
        itemType = _itemType;
        quantity = _quantity;
        listingPrice = _listingPrice;
        listingPriceCurrency = _listingPriceCurrency;
        bidPrice = _bidPrice;
        bidPriceCurrency = _bidPriceCurrency;
        maxBids = _maxBids;
    }

    /**
    * @dev This function to add new bidder
    */
    function newBid() external auctionOpen {
        
        bidders[currentBidCount + 1] = msg.sender;
        currentBidCount++;
    }

    modifier auctionOpen() {
        require (currentBidCount < maxBids, "Auction full");
        _;
    }
}
