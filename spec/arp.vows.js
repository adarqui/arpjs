var
	vows = require('vows'),
	assert = require('assert'),
	_Arp = require('Arp.js')
	;

	var Arp = new _Arp();

vows.describe("arp module").addBatch({
	"when running show with no arguments" : {
		topic : function() { try { Arp.Show(); return false; } catch(err) { return true; } },
		"should error" : function(topic) {
			assert.isTrue(topic);
		},
	},

	"when running with incorrect interface" : {
		topic : function() {
			Arp.Set({
				address : "192.168.1.50",
				interface : "doskdogksdo",
			}, this.callback);
		},
		"err should be true in the callback" : function(err,data) {
			console.log("err",err,"data",data);
			assert.isTrue(err);
		}
	},
	"when running with incorrect address" : {
		topic : function() {
			Arp.Set({
				address : "355.355.355.355",
				interface : "wlan0",
			}, this.callback);
		},
		"err should be true in the callback" : function(err,data) {
			assert.isTrue(err);
		},
	},
	"when running without Arp.Set without needed opts fields" : {
		"should throw error without address" : function() {
			assert.throws(
				function() {
					Arp.Set({
						interface : "wlan0"
					}, function(err,data) { })
				}
			, Error)
		},
		"should throw error without interface" : function() {
			assert.throws(
				function() {
					Arp.Set({
						address : "192.168.1.51",
					}, function(err,data) { })
				}
			, Error);
		},
	},
}).run();
