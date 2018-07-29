//nodemon playground/arrow-function.js

// var square = (x) => {
//     var result = x * x;
//     return result;
// };


var square = x => x * x;
console.log(square(7));


var user = {
    name: 'Andrew',
    sayHi: () => {
        //console.log(arguments);
        console.log(`Hi ${this.name}`);
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi ${this.name}`);
    }
}

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3); 