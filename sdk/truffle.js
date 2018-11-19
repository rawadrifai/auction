require('babel-register');
require('babel-polyfill');

module.exports = {
  contracts_build_directory: './src/contracts',

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      gas: 2970000,
      gasPrice: '20',
      network_id: '*' // Match any network id
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      gas: 2970000,
      gasPrice: '20',
      network_id: '5777' // Match ganache
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      gas: 2970000,
      gasPrice: '20',
      network_id: '4' // Match rinkeby network id
    },
    mainnet: {
      host: 'localhost',
      port: 8545,
      network_id: '1', // Match mainnet network id
      from: '0x76718ed27374a9fd670b548a058ba58fcd23a316',
      gas: 2970000,
      gasPrice: '20'
    }
  }
};
