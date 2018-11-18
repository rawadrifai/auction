/**
 * @author Rawad Rifai - rawad@hedgebase.io
 * @author Brett Hayes - brett@hedgebase.io
 */

/**
 * This file contains some utility functions
 */

/**
 * This function converts ascii to hex
 */
export function ascii_to_hex(str) {
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
export function hex_to_ascii(hexx) {
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

/**
 * This function converts a scientific notation number into a long number
 * @param {number} x
 */
export function scientificToDecimal(num) {
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    var zero = '0',
      parts = String(num)
        .toLowerCase()
        .split('e'), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split('.');
    if (sign === -1) {
      coeff_array[0] = Math.abs(coeff_array[0]);
      num = '-' + zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    } else {
      var dec = coeff_array[1];
      if (dec) l = l - dec.length;
      num = coeff_array.join('') + new Array(l + 1).join(zero);
    }
  }

  return num;
}
