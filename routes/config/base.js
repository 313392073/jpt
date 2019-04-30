const publicPath = 'http://39.97.119.155:85';
const orderArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const makeOrder = function(num) {
    return orderArr[num]
}
let sortOrder = function (property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
module.exports = {
    publicPath:publicPath,
    makeOrder:makeOrder,
    sortOrder:sortOrder
}