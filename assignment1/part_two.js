//Vera Sol Nygren
//verasolnygren@gmail.com
//Stanislav Alpatiev
//stal5991@student.su.se

createClass = function(name, superclasses) {
    let object = {};
    object.name = name;
    object.superclasses = superclasses;
    object.new = function () {
        return this;
    }    

    object.call = function (functionName, parameters) {
        if (typeof this[functionName] === 'function') {
            return this[functionName](parameters);
        }
        
        if (this.superclasses != null) {
            for (let superclass of this.superclasses) {
                var returnValue = superclass.call(functionName, parameters);
                if(returnValue) {
                    return returnValue;
                }
            }
        }
    }

    object.addSuperClass = function (...newSuperclass) {

        this.isInheritenceCircular(this, newSuperclass)
        for(let superclass of this.newSuperClass){
            this.superclasses.push(superclass);
        }
    }

    object.isInheritenceCircular = function (currentObject, superclasses){
        for (let superclass of superclasses){
            if(superclass.superclasses === null){
                superclass.superclasses = [];
            }
            if(superclass.superclasses.includes(currentObject) || 
            superclass.isInheritenceCircular(currentObject, superclass.superclasses)) {
                throw new Error('Circular inheritence!');
            }
        }
    }

    return object;
}

// var class0 = createClass("Class 0", null);
// var class1 = createClass("Class 1", [class0]);
// var class2 = createClass("Class 2", [class1]);
// var class3 = createClass("Class 3", [class2]);
// class0.addSuperClass(class3);


var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func: " + arg; };

//ärver av Class0, har därmed func0
var class1 = createClass("Class1", [class0]);

//class2 är tom 
var class2 = createClass("Class2", []);

//class2 har func2
class2.function = function(arg) { return "function: " + arg; };

//class3 ärver av class1 och class2 - har därmed func0 och func2
var class3 = createClass("Class3", [class1, class2]);


//skapar en instans av class3
var obj3 = class3.new();

var result = obj3.call("function", ["hello there"]);
console.log(result);
var result = obj3.call("func", ["hello"]);
console.log(result);

// // //försöker skriva ut en func0 från 
// var result = obj3.call("func0", ["hello1"]);
// console.log("should print 'func: hello1' ->", result);

// class0 = createClass("Class0", null);

// class0.func = function(arg) { return "func0: " + arg; };

// class1 = createClass("Class1", [class0]);

// class2 = createClass("Class2", []);

// class3 = createClass("Class3", [class2, class1]);

// obj3 = class3.new();

// result = obj3.call("func", ["hello2"]);
// console.log("should print 'func: hello2' ->", result);

// class0 = createClass("Class0", null);
// class0.func = function(arg) { return "func: " + arg; };

// var obj0 = class0.new();

// result = obj0.call("func", ["hello3"]);
// console.log("should print 'func0: hello3' ->", result);



/*
Example:

var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);

where 'result' is assigned 'func0: hello'.
Another example of method lookup testing:

class0 = createClass("Class0", null);

class0.func = function(arg) { return "func0: " + arg; };

class1 = createClass("Class1", [class0]);

class2 = createClass("Class2", []);

class3 = createClass("Class3", [class2, class1]);

obj3 = class3.new();

result = obj3.call("func", ["hello"]);

where 'result' is assigned 'func0: hello'.
Another example of method lookup testing that the method will be found
in the object's own class:

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };

var obj0 = class0.new();

result = obj0.call("func", ["hello"]);

where 'result' is assigned 'func0: hello'.
*/