/* eslint-disable no-extend-native, func-names */
Array.prototype.mean = function () {
  return this.reduce((Q, Y) => Q + Y, 0) / this.length
}
