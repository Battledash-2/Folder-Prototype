module.exports = ()=>function(code){ // to access 'this', you need to use function() {} instead of ()=>{}
    this.code = code;
}