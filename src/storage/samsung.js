//------------------------------------//
//  STORAGE: SAMSUNG
//------------------------------------//

// => TV_Storage_Samsung implements TV_Storage interface.

// Official SamsungDForum documentation
// (http://www.samsungdforum.com/Guide/ref00001/index.html)
//
// File API enables applications to use the file input/output system supported
// by the Samsung TV application engine to store data they get while they are
// still working, and restore the data anytime they want. All applications
// perform file input/output operations in a common area. Files used in
// different applications may have the same name. To prevent problems due to
// this, a directory using application ID (curWidget.id) must be created, and
// the file in this directory is used. If multiple applications need to share
// data, they do it through a file path that they share.

// NOTE:
// openCommonFile
// (http://www.samsungdforum.com/Guide/ref00001/openCommonFile.html)
// r  : Open a file for reading. The file must exist.
// w  : Create an empty file for writing. If a file with the same name already
//      exists, its content is erased and the file is treated as a new empty
//      file.
// a  : Append to a file. Writing operations append data at the end of the file.
//      The file is created if it does not exist.
// r+ : Open a file for update (both reading and writing). The file must exist.
// w+ : Create an empty file for both reading and writing. If a file with the
//      same name already exists, its content is erased and the file is treated
//      as a new empty file.
// a+ : Open a file for reading and appending. All writing operations are
//      performed at the end of the file, protecting the previous content from
//      being overwritten.



var inherits = require('../inherits');
var TV_Storage = require('../storage');
var TV_Storage_Default = require('default');


var TV_Storage_Samsung;

var create = function() {

	TV_Storage_Samsung = function() {
		this._fileSystem = new FileSystem();
		this.root = curWidget.id;
		this.fileName = this.root + '/localStorage.data';
		this.storage = {};
		this.keys = [];

		this.init();
	};


	inherits(TV_Storage_Samsung, TV_Storage, {

		//  Implement interface TV_Storage
		//------------------------------------//

		length: (function() {
			// var size = 0, key;
			// for (key in this.storage) {
			// 	if (this.storage.hasOwnProperty(key)) {
			// 		size++;
			// 	}
			// }
			// return size;
			return this.keys.length;
		})(),

		key: function(index) {
			var k = this.key[index];
			return k ? k : null;
		},

		getItem: function(key) {
			return this.storage[key];
		},

		setItem: function(key, value) {
			this.storage[key] = value;
			this.keys[this.keys.length] = key;
			this.saveFile();
			return this[key];
		},

		removeItem: function(key) {
			var index = this.key.indexOf(key);
			this.keys.splice(index, 1);
			delete this.storage[key];
		},

		clear: function() {
			// delete directory
			if(!this._fileSystem.isValidCommonPath(this.root)) {
				this._fileSystem.deleteCommonDir(this.root);
			}
			this.init();
		},


		//  Aux
		//------------------------------------//

		init: function() {
			var file, i = 0, key;

			// reset properties
			this.storage = {};
			this.keys = {};
			this.changed = false;

			// create new directory for app if none
			if(!this._fileSystem.isValidCommonPath(this.root)) {
				this._fileSystem.createCommonDir(this.root);
			}

			// create localStorage file
			file = this._fileSystem.openCommonFile(this.fileName, 'r+');
			if (file) {
				try {
					this.storage = JSON.parse(file.readAll());
					for (key in this.storage) {
						if (this.storage.hasOwnProperty(key)) {
							this.keys[i] = key;
							i++;
						}
					}
				} catch(e) {}
			} else {
				file = this._fileSystem.openCommonFile(this.fileName, 'w');
				file.writeAll('{}');
			}
			this._fileSystem.closeCommonFile(file);
		},

		saveFile: function() {
			if (typeof JSON === 'object') {
				var file = this._fileSystem.openCommonFile(this.fileName, 'w');
				file.writeAll(JSON.stringify(this.storage));
				this._fileSystem.closeCommonFile(file);
			}
		}

	});

};


//
// RUN
//

if (typeof localStorage === 'undefined' &&
	typeof FileSystem === 'function') {

	// Samsung 'FileSystem' object fallback
	// if HTML5 localStorage is not available
	create();

} else {
	
	// HTML5 localStorage available
	TV_Storage_Samsung = TV_Storage_Default;

}

module.exports = TV_Storage_Samsung;
