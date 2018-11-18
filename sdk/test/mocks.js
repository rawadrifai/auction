export const data = {
  itemTitle: '1 Ether',
  description: '1 Ether',
  itemType: 'Cryptocurrency',
  quantity: 1,
  listingPrice: 0.1,
  listingPriceCurrency: 'ETH',
  bidPrice: 0.1,
  bidPriceCurrency: 'ETH',
  maxBids: 100
};

export const rpc = 'http://127.0.0.1:8545';
export const infuraRinkeyRPC =
  'https://rinkeby.infura.io/L8oEX1CRugs7957zJVDa ';

export const account0 = '0x627306090abab3a6e1400e9345bc60c78a8bef57';
export const account1 = '0xf17f52151ebef6c7334fad080c5704d77216b732';
export const account2 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef';
export const account3 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544';
export const account4 = '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2';

export const gasLimit = 6500000;
export const gasPrice = '10';
export const gasUnit = 'gwei';
export const mnemonic =
  'nerve flash awake estate impose rain powder tobacco edit seminar immune leave';
export const mnemonicAccount = '0x7bea3be9e43a750689f4798c86311db0bea6b140';

export const cnx = {
  rpc: rpc,
  coinbase: account0,
  gasLimit: gasLimit,
  gasPrice: gasPrice,
  gasUnit: gasUnit,
  walletType: 1
};

export const infuraRinkebyCnx = {
  rpc: infuraRinkeyRPC,
  gasLimit: gasLimit,
  gasPrice: gasPrice,
  gasUnit: gasUnit,
  walletType: 3,
  mnemonic: mnemonic,
  mnemonicAccount: mnemonicAccount
};
