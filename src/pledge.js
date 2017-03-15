'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
    // promise =  new $Promise();
    this._value;
    this._state = 'pending';
    this._handlers = [];
    if (executor) {
        executor(this._internalResolve.bind(this),this._internalReject.bind(this));
    }
    return this;
}

$Promise.prototype._internalResolve = function(data) {
    if (this._state !== 'pending') return;
    this._value = data;
    this._state = 'fulfilled';
    this._handlers.forEach(handler => handler(data))
}

$Promise.prototype._internalReject = function(err) {
    if (this._state !== 'pending') return;
    this._value = err;
    this._state = 'rejected';
    //this._handlers?
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
