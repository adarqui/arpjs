var
	_Arp = require('./Arp.js'),
	Cproc = require('child_process')
	;

var Arp = new _Arp();
Arp.Show(function(err,js) {
	console.log("err",err,"js",js);
});

Arp.Show({ numeric : true }, function(err,js) {
	console.log("err",err,"js",js);
});
//Arp.Show();
