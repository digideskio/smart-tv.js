//------------------------------------//
//  STORAGE
//------------------------------------//

// Interface to be inherited and implemented by all supported storages.

// http://dev.w3.org/html5/webstorage/#storage
// interface Storage {
//     readonly attribute unsigned long length;
//     DOMString? key(unsigned long index);
//     getter DOMString? getItem(DOMString key);
//     setter creator void setItem(DOMString key, DOMString value);
//     deleter void removeItem(DOMString key);
//     void clear();
// };



var TV_Storage = function() {};

TV_Storage.prototype = {

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-length)
	// The length attribute must return the number of key/value pairs currently
	// present in the list associated with the object.
	//
	length: 0,

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-key)
	// The key(n) method must return the name of the nth key in the list. The
	// order of keys is user-agent defined, but must be consistent within an
	// object so long as the number of keys doesn't change. (Thus, adding or
	// removing a key may change the order of the keys, but merely changing the
	// value of an existing key must not.) If n is greater than or equal to the
	// number of key/value pairs in the object, then this method must return
	// null.
	//
	key: function(index) {},

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-getitem)
	// The getItem(key) method must return the current value associated with the
	// given key. If the given key does not exist in the list associated with
	// the object then this method must return null.
	//
	getItem: function(key) {},

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-setitem)
	// The setItem(key, value) method must first check if a key/value pair with
	// the given key already exists in the list associated with the object.
	//
	setItem: function(key, value) {},

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-removeitem)
	// The removeItem(key) method must cause the key/value pair with the given
	// key to be removed from the list associated with the object, if it exists.
	// If no item with that key exists, the method must do nothing.
	//
	removeItem: function(key) {},

	//
	// (http://dev.w3.org/html5/webstorage/#dom-storage-clear)
	// The clear() method must atomically cause the list associated with the
	// object to be emptied of all key/value pairs, if there are any. If there
	// are none, then the method must do nothing.
	//
	clear: function() {}

};

module.exports = TV_Storage;
