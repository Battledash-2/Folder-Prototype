module.exports = ()=>function(){ // to access 'this', you need to use function() {} instead of ()=>{}
    return eval(this.code);
}