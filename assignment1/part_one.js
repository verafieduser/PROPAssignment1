//Vera Sol Nygren
//verasolnygren@gmail.com
//Stanislav Alpatiev
//stal5991@student.su.se

var myObject = {
    prototypes: []
}

myObject.create = function (prototypes){
    let object = {};
    object.__proto__ = this;
    object.prototypes = prototypes;
    return object;
}

myObject.call = function (functionName, parameters) {
    if (typeof this[functionName] === 'function') {
        return this[functionName](parameters);
    }

    if (this.prototypes != null) {
        for (let prototype of this.prototypes) {
            var returnValue = prototype.call(functionName, parameters);
            if(returnValue) {
                return returnValue;
            }
        }    
    }
}

myObject.addPrototype = function (...prototypes) {
    if(this.prototypes == null){
        this.prototypes = [];
    }
    this.isPrototypingCircular(this, prototypes);


    // }
    this.prototypes.push(prototypes);
} 

myObject.isPrototypingCircular = function (currentObject, prototypes){
    for (let prototype of prototypes){
        if(prototype.prototypes === null){
            prototype.prototypes = [];
        }
        if(prototype.prototypes.includes(currentObject) || prototype.isPrototypingCircular(currentObject, prototype.prototypes)){
            throw new Error('Circular prototyping!');
        }
    }
}


// var obj0 = myObject.create(null);
// var obj1 = myObject.create([obj0]);
// obj0.addPrototype(obj1);


// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// var obj1 = myObject.create([obj0]);
// var obj2 = myObject.create([]);
// obj2.func = function(arg) { return "func2: " + arg; };
// var obj3 = myObject.create([obj1, obj2]);
// var result = obj3.call("func", ["hello"]) ;
// console.log("should print 'func0: hello' ->", result);

// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// obj1 = myObject.create([obj0]);
// obj2 = myObject.create([]);

// obj3 = myObject.create([obj2, obj1]);
// result = obj3.call("func", ["hello"]);
// console.log("should print 'func0: hello' ->", result);

// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// result = obj0.call("func", ["hello"]);
// console.log("should print 'func0: hello' ->", result);




// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };

// var obj1 = myObject.create([obj0]);


// var obj2 = myObject.create([obj1]);

// var obj3 = myObject.create([obj2]);

// result = obj3.call("func", ["hello0"]);
// console.log("should print 'func0: hello0' ->", result);

// obj0.addPrototype(obj3);

// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };
// result = obj0.call("func", ["hello0"]);
// console.log("should print 'func0: hello0' ->", result);

// var obj1 = myObject.create([obj0]);
// obj1.function = function(arg) { return "func0: " + arg; };
// result = obj1.call("function", ["hello1"]);
// console.log("should print 'func0: hello1' ->", result);


// var obj2 = myObject.create(null);
// obj2.addPrototype(obj1);
// result = obj2.call("func", ["hello2"]);
// console.log("should print 'func0: hello2' ->", result);


// var obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };

// var obj1 = myObject.create([obj0]);
// var obj2 = myObject.create([]);

// obj2.func = function(arg) { return "func2: " + arg; };
// var obj3 = myObject.create([obj1, obj2]);

// var result = obj3.call("func", ["hello0"]) ;
// console.log("should print 'func0: hello0' ->", result);

// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };

// obj1 = myObject.create([obj0]);

// obj2 = myObject.create([]);

// obj3 = myObject.create([obj2, obj1]);

// result = obj3.call("func", ["hello1"]);
// console.log("should print 'func0: hello1' ->", result);

// obj0 = myObject.create(null);
// obj0.func = function(arg) { return "func0: " + arg; };

// result = obj0.call("func", ["hello2"]);
// console.log("should print 'func0: hello2' ->", result);
