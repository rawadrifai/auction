// External libraries
import Web3 from 'web3';
var HDWalletProvider = require('truffle-hdwallet-provider');

// Internal libraries
import Wallets from './wallets';

/**
 * This class gives you an object that allows you to
 * connect to the Ethereum blockchain, and retrieve
 * information such as accounts and balances.
 */
export class EthAdapter {
  web3;
  rpc;
  coinbase;
  gasLimit;
  gasPrice;
  gasUnit;
  walletType;
  mnemonic;
  mnemonicAccount;

  /**
   * Creates a new instance of EthAdapter
   * @constructor
   * @param {JSON} cnx the connection object following the open standard
   */
  constructor(cnx) {
    // if cnx is passed, we're connecting to a known ETH node
    if (cnx) {
      this.rpc = cnx.rpc;
      this.gasLimit = cnx.gasLimit;
      this.gasPrice = cnx.gasPrice;
      this.gasUnit = cnx.gasUnit;
      this.walletType = cnx.walletType;
      this.coinbase = cnx.coinbase;
      this.mnemonic = cnx.mnemonic;
      this.mnemonicAccount = cnx.mnemonicAccount;
    }

    // get the web3
    this.getWeb3();
  }

  /**
   * This function sets the web3 instance.
   */
  getWeb3() {
    // get the injected web3 (if available)
    var web3 = global.web3;

    // switch on walletType passed in cnx in the constructor
    switch (this.walletType) {
      // if local node wallet
      case Wallets.walletTypes.localnode:
        // instantiate new web3 HttpProvider
        var provider = new Web3.providers.HttpProvider(this.rpc);
        this.web3 = new Web3(provider);

        break;

      // if metamask wallet
      case Wallets.walletTypes.metamask:
        // create a new HttpProvider from the injected web3
        this.web3 = new Web3(web3.currentProvider);

        break;

      // if mnemonic wallet with custom rpc
      case Wallets.walletTypes.mnemonic:
        // instantiate new web3 HttpProvider
        var provider = new HDWalletProvider(
          this.mnemonic,
          this.rpc
          //this.accountIndex
        );
        this.web3 = new Web3(provider);

        // set coinbase account
        this.coinbase = this.mnemonicAccount;

        break;
    }

    // log errors if there is no web3 defined yet
    if (this.web3.currentProvider == undefined) {
      console.log(this.web3.currentProvider);
      console.log('problems with web3 provider');
    }
  }

  /**
   * This function returns the coinbase account in a callback.
   * @param {Function} callback callback function
   */
  getCoinbaseAsync(callback) {
    // call the getCoinbase function with callback
    this.web3.eth.getCoinbase((err, res) => {
      // exit if err
      if (err) {
        callback(err, undefined);
        return;
      }

      // set the global coinbase account
      const account = res;
      callback(undefined, { account });
    });
  }

  /**
   * This function returns the coinbase account + balance in a callback.
   * @param {Function} callback callback function
   */
  getCoinbaseWithBalanceAsync(callback) {
    this.web3.eth.getCoinbase((err, res) => {
      // exit if err
      if (err) {
        callback(err, undefined);
        return;
      }

      // get balance
      this.web3.eth.getBalance(res, (err1, res1) => {
        // exit if err
        if (err1) {
          callback(err1, undefined);
          return;
        }

        const account = res;
        const balance = res1.toNumber();
        callback(undefined, { account, balance });
      });
    });
  }

  /**
   * This function returns the balance of an account synchronously.
   * @param {string} account the account number
   * @returns {number} the account balance
   */
  getBalance(account) {
    // get the balance
    const _balance = this.web3.eth.getBalance(account);

    // convert from big number to number
    const balance = _balance.toNumber();

    // return the balance
    return balance;
  }

  /**
   * This function returns the balance in a callback.
   * @param {string} account the account number
   * @param {Function} callback the callback function
   */
  getBalanceAsync(account, callback) {
    this.web3.eth.getBalance(account, (err, res) => {
      // exit if err
      if (err) {
        callback(err, undefined);
        return;
      }

      const balance = res.toNumber();
      callback(undefined, { account, balance });
    });
  }

  /**
   * This function gets the current nonce
   */
  getNonce() {
    return this.web3.eth.getTransactionCount(this.coinbase);
  }

  /**
   * This function gets the accounts synchronously
   */
  getAccounts() {
    let accounts = [];

    // loop through the accounts and push them to an array
    this.web3.eth.accounts.forEach(account => {
      accounts.push({ account, balance });
    });

    // return array of accounts
    return accounts;
  }

  /**
   * This function gets the accounts + balances synchronously
   */
  getAccountsWithBalances() {
    let accounts = [];

    // loop through accounts and push them + balances to array
    this.web3.eth.accounts.forEach(account => {
      const _balance = this.web3.eth.getBalance(account);
      const balance = _balance.toNumber();
      accounts.push({ account, balance });
    });

    return accounts;
  }

  /**
   * This function gets the accounts asynchronously
   */
  getAccountsAsync(callback) {
    this.web3.eth.getAccounts((err, res) => {
      callback(err, res);
    });
  }

  /**
   * This function gets transaction details from tx hash
   * @param {string} txHash the transaction hash
   * @param {Function} callback the callback function to return tx in (err, res)
   */
  getTransaction(txHash, callback) {
    return this.web3.eth.getTransaction(txHash, callback);
  }

  /**
   * This function extracts the published contract address from a txHash
   * @param {string} txHash the transaction hash
   * @param {function} callback callback function
   */
  getContractAddressFromTxHash(txHash, callback) {
    // get ECUtil instance to calculate sha3 of event (we will need this to parse the logs)
    const ecUtil = new ECUtil(this);
    const eventSignature = ecUtil.regularSoliditySha3(
      'ModeratedBinaryCreated(address)'
    );

    // get the transaction receipt
    this.web3.eth.getTransactionReceipt(txHash, (err, res) => {
      // if err return immediately with callback
      if (err) {
        callback(err, null);
        return;
      }

      // get logs, filter them based on event Signature needed, and extract contract address
      const logs = res.logs;
      const filtered = logs.filter(entry =>
        entry.topics.includes(eventSignature)
      );
      const contractAddr =
        '0x' + filtered[0].data.substr(filtered[0].data.length - 40, 40);

      // call the callback with the contract address
      callback(null, contractAddr);
    });
  }
}

export default EthAdapter;
