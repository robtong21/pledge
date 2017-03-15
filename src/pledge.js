'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
    // promise =  new $Promise();
    this._value;
    this._state = 'pending';
    this._handlerGroups = [];
    if (executor) {
        executor(this._internalResolve.bind(this),this._internalReject.bind(this));
    }
    return this;
}

$Promise.prototype._internalResolve = function(data) {
    if (this._state !== 'pending') return;
    this._value = data;
    this._state = 'fulfilled';
    this._callHandlers();
}

$Promise.prototype._internalReject = function(err) {
    if (this._state !== 'pending') return;
    this._value = err;
    this._state = 'rejected';
    this._callHandlers();
}

$Promise.prototype.then = function(successCb, errorCb) {
    var obj = {};
    if(typeof successCb !== 'function') {
        obj.successCb = null;
    } else {
        obj.successCb = successCb;
    }
    if(typeof errorCb !== 'function') {
        obj.errorCb = null;
    } else {
        obj.errorCb = errorCb;
    }

    this._handlerGroups.push(obj);
    //console.log("this._handlerGroups: ", this._handlerGroups);
    if(this._state !== 'pending') {
        this._callHandlers();
    }

}

$Promise.prototype.catch = function(func) {
    this.then(null, func)
}

$Promise.prototype._callHandlers = function() {
    if (this._state === 'fulfilled') {
        this._handlerGroups.forEach(handler => handler.successCb(this._value));
    } else {
        this._handlerGroups.forEach(handler => {
            if (handler.errorCb) {
                handler.errorCb(this._value);
            }
        })
    }
    this._handlerGroups = [];
}

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
