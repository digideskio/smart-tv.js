//------------------------------------//
//  Extend
//------------------------------------//

// => Usage:



var inherits = require('inherits');

module.exports = function(sub, sup, proto) {
    inherits(sub, sup);
    if (typeof proto !== 'undefined') {
        Object.keys(proto).forEach(function(key) {
            sub.prototype[key] = proto[key];
        });
    }
};