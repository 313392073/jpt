const publicPath = 'http://39.97.119.155:85';
const orderArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const makeOrder = function(num) {
    return orderArr[num]
}
module.exports = {
    publicPath:publicPath,
    makeOrder:makeOrder
}