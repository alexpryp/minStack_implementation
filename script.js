"use strict"

function Stack(capacity) {
    this._capacity = capacity || Infinity;
    this._storage = {};
    this._count = 0;
}

Stack.prototype.push = function(value) {
    if (this._count < this._capacity) {
        this._storage[this._count++] = value;
        return this._count;
    }
    return "Max capacity already reached. Remove element before adding a new one."
};

Stack.prototype.pop = function() {
    var value = this._storage[--this._count];
    delete this._storage[this._count];
    if (this._count < 0) {
        this._count = 0;
    }
    return value;
};

Stack.prototype.peek = function() {
    return this._storage[this._count - 1];
}

MinStack.prototype.count = function() {
    return this._count;
};

/*The MinStack is inherited from the Stack*/
function MinStack(capacity) {
    this._capacity = capacity || Infinity;
    this._storage = {};
    this._count = 0;
    this._min = new Stack();
}

MinStack.prototype = Object.create(Stack.prototype);
MinStack.prototype.constructor = MinStack;

/*Redefine the methods push and pop*/
MinStack.prototype.push = function(value) {
    if(this._count < this._capacity) {
        if(this._min.peek() < value) {
            this._min.push(this._min.peek());
        } else {
            this._min.push(value);
        }
        this._storage[this._count++] =value;
        return this._count;
    }
    return "Max capacity already reached. Remove element before adding a new one";
};

MinStack.prototype.pop = function() {
    this._min.pop();
    var value = this._storage[--this._count];
    delete this._storage[this._count];
    if(this._count < 0) {
        this._count = 0;
    }
    return value;
};


MinStack.prototype.min = function() {
    return this._min.peek();
};


/*Testing*/
var minStack = new MinStack(10);

minStack.push(5);
minStack.push(6);
minStack.push(3);
minStack.push(4);
minStack.push(1);
minStack.push(2);

console.log(minStack._storage);
console.log(minStack._min._storage);

console.log(minStack.pop());
console.log(minStack._storage);
console.log(minStack._min._storage);

console.log(minStack.pop());
console.log(minStack._storage);
console.log(minStack._min._storage);

console.log(minStack.pop());
console.log(minStack._storage);
console.log(minStack._min._storage);
