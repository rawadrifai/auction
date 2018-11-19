// External libraries
import TruffleContract from 'truffle-contract';

// Internal libraries
import { EthAdapter } from './util/ethAdapter';

// Resources
import GNRAuctionABI from './contracts/GNRAuction.json';

export class GNRAuctionClient {
  ethAdapter;

  /**
   * Creates a new instance of GNRAuctionClient.
   * @constructor
   * @param {EthAdapter} _ethAdapter EthAdapter object
   */
  constructor(_ethAdapter) {
    this.ethAdapter = _ethAdapter;
  }

  async createAuction(auctionObject) {
    // create a truffle contract
    const truffleContract = TruffleContract(GNRAuctionABI);
    truffleContract.setProvider(this.ethAdapter.web3.currentProvider);

    // create a new proxy contract
    const result = await truffleContract.new(
      auctionObject.itemTitle,
      auctionObject.description,
      auctionObject.itemType,
      auctionObject.quantity,
      auctionObject.listingPrice,
      auctionObject.listingPriceCurrency,
      auctionObject.bidPrice,
      auctionObject.bidPriceCurrency,
      auctionObject.maxBids,
      {
        from: this.ethAdapter.coinbase,
        gas: this.ethAdapter.gasLimit
      }
    );

    // return the address of the proxy created
    return result.address;
  }
}

export default GNRAuctionClient;
