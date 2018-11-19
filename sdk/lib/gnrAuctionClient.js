'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GNRAuctionClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Rawad Rifai - rawad@hedgebase.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Brett Hayes - brett@hedgebase.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// External libraries


// Internal libraries


// Resources


var _truffleContract = require('truffle-contract');

var _truffleContract2 = _interopRequireDefault(_truffleContract);

var _ethAdapter2 = require('./util/ethAdapter');

var _GNRAuction = require('../contracts/GNRAuction.json');

var _GNRAuction2 = _interopRequireDefault(_GNRAuction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GNRAuctionClient = exports.GNRAuctionClient = function () {
  //ethAdapter;

  /**
   * Creates a new instance of GNRAuctionClient.
   * @constructor
   * @param {EthAdapter} _ethAdapter EthAdapter object
   */
  function GNRAuctionClient(_ethAdapter) {
    // this.ethAdapter = _ethAdapter;

    _classCallCheck(this, GNRAuctionClient);
  }

  _createClass(GNRAuctionClient, [{
    key: 'createAuction',
    value: async function createAuction(auctionObject, callback) {
      // create a truffle contract
      var truffleContract = (0, _truffleContract2.default)(_GNRAuction2.default);
      truffleContract.setProvider(this.ethAdapter.web3.currentProvider);

      // create a new proxy contract
      var result = await truffleContract.new(auctionObject.itemTitle, auctionObject.description, auctionObject.itemType, auctionObject.quantity, auctionObject.listingPrice, auctionObject.listingPriceCurrency, auctionObject.bidPrice, auctionObject.bidPriceCurrency, auctionObject.maxBids, {
        from: this.ethAdapter.coinbase,
        gas: this.ethAdapter.gasLimit
      });

      // return the address of the proxy created
      return result.address;
    }
  }]);

  return GNRAuctionClient;
}();

exports.default = GNRAuctionClient;