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

    for (let prototype of this.prototypes) {
        var returnValue = prototype.call(functionName, parameters);
        if(returnValue) {
            return returnValue;
        }
    }
}

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };

var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);

obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);

var result = obj3.call("func", ["hello0"]) ;
console.log("should print 'func0: hello0' ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };

obj1 = myObject.create([obj0]);

obj2 = myObject.create([]);

obj3 = myObject.create([obj2, obj1]);

result = obj3.call("func", ["hello1"]);
console.log("should print 'func0: hello1' ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };

result = obj0.call("func", ["hello2"]);
console.log("should print 'func0: hello2' ->", result);
