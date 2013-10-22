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

Arp.Show({
	interface : "eth0"
}, function(err,js) {
	console.log("err",err,"js",js);
});

Arp.Set({
	address : "192.168.1.7",
	interface : "eth0"
}, function(err,data) {
	console.log(err,data);
});

Arp.Set({
	address : "192.168.1.8",
	interface : "wlan0"
}, function(err,data) {
	console.log(err,data);
});

Arp.Set({
	address : "192.168.1.12",
	hwaddr : "ca:dd:b4:44:41:a5",
}, function(err,data) {
	console.log(err,data);
});

Arp.Set({
	address : "192.168.1.14",
	interface : "vlan0",
}, function(err,data) {
	console.log(err,data);
});

Arp.Flush({
	interface : "wlan0"
});
