const publicPath = 'http://118.31.8.72:85';
const orderArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const makeOrder = function(num) {
    return orderArr[num]
}
module.exports = {
    publicPath:publicPath,
    makeOrder:makeOrder
}