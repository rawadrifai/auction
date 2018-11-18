import GNRAuctionClient from '../src/gnrAuctionClient';
import EthAdapter from '../src/util/ethAdapter';
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
    let proxyClient = new ProxyClient(ethAdapter);

    // create proxy
    let proxy_address = await proxyClient.createProxy(
      Mocks.tokenRegistryName,
      Mocks.exchangeRegistryName,
      ensRegistry
    );

    assert.ok(proxy_address);

    let savedEnsRegistryAddr = await proxyClient.getEnsRegistryAddr(
      proxy_address
    );
    let savedTokenRegistry = await proxyClient.getTokenRegistry(proxy_address);
    let savedExchangeRegistry = await proxyClient.getExchangeRegistry(
      proxy_address
    );

    assert(
      savedEnsRegistryAddr == ensRegistry,
      'savedEnsRegistryAddr = {0}. expected = {1}'.format(
        savedEnsRegistryAddr,
        ensRegistry
      )
    );

    assert(
      savedTokenRegistry == tokenRegistryHash,
      'savedTokenRegistry = {0}. expected = {1}'.format(
        savedTokenRegistry,
        tokenRegistryHash
      )
    );

    assert(
      savedExchangeRegistry == exchangeRegistryHash,
      'savedExchangeRegistry = {0}. expected = {1}'.format(
        savedExchangeRegistry,
        exchangeRegistryHash
      )
    );
  });
}); // end of contract
