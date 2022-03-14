class Test {}

const folderPrototype = require('../index.js');
folderPrototype(Test, 'client'); // synchronous function

const myTest = new Test();

myTest.setCode('console.log("Hello");');
console.log(myTest.execute());