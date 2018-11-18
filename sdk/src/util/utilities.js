/**
 * @author Rawad Rifai - rawad@hedgebase.io
 * @author Brett Hayes - brett@hedgebase.io
 */

// External libraries
const BN = require('bn.js');

/**
 * This class provides adhoc utility functions
 */
export class Utilities {
  pad(t, size) {
    var s = t;
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }

  toBN(val) {
    return new BN(val.toString())
      .mul(new BN(Math.pow(10, 18).toString()))
      .toString();
  }

  toSN(val, precision) {
    let division = new BN(val.toString())
      .div(new BN(Math.pow(10, 18).toString()))
      .toString();

    let modulus = new BN(val.toString())
      .mod(new BN(Math.pow(10, 18).toString()))
      .toString();

    modulus = this.pad(modulus, 18);

    return division + '.' + modulus.substr(0, precision);
  }

  ascii_to_hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return '0x' + arr1.join('');
  }

  /**
   * This function converts hex to ascii
   */
  hex_to_ascii(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

    // preserve newlines, etc - use valid JSON
    str = str
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    // remove non-printable and other non-valid JSON chars
    str = str.replace(/[\u0000-\u0019]+/g, '');

    return str;
  }
}

export default Utilities;
