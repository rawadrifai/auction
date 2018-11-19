import { GNRAuctionClient } from '../src/gnrAuctionClient';
import { EthAdapter } from '../src/util/ethAdapter';
import * as Mocks from './mocks';
const BN = require('bn.js');

const namehash = require('eth-ens-namehash');

String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace('{' + k + '}', arguments[k]);
  }
  return a;
};

contract('GNRAuctionClient', accounts => {
  let ethAdapter;

  before(async () => {
    ethAdapter = new EthAdapter(Mocks.cnx);
  });

  it('should create auction', async () => {
    let gnrAuctionClient = new GNRAuctionClient(ethAdapter);

    // create proxy
    let auction_address = await gnrAuctionClient.createAuction(Mocks.data);
    console.log('auction_address', auction_address);

    assert.ok(auction_address);
  });
}); // end of contract
