var
	Cproc = require('child_process')
	;

var _Arp = function(opts) {
	var Arp = this;
	var Private = {};
	Private.exec = Cproc.exec;
	Private.bin = "/usr/sbin/arp";

	Arp.GenericOptions = function(argv,opts) {
		if(!opts) return;

		if(opts.numeric) {
			argv.push('--numeric');
		}

		if(opts.raw) {
			/* Needs to trigger 'raw' mode
			 * ie, for show, read /proc/net/arp. For add/del, use socket/ioctl
			 */
		}
	}


	Arp.Show = function() {
		var argv = [], cb, syntax;
		if(arguments.length != 0 && typeof arguments[0] == 'object') {
			Arp.GenericOptions(argv,arguments[0]);
			cb = arguments[1];
		}
		else if(arguments.length == 1 && typeof arguments[0] === 'function') {
			cb = arguments[0];
		}
		else {
			throw new Error('Arp.Show: ERROR => Provide a callback.');
			return;
		}
		syntax = Private.bin + ' ' + argv.join(' ');
		Private.exec(syntax, function(err,stdout,stderr) {
			var js = { }, lines;
			if(!err) {
				js.entries = [];
				lines = stdout.split('\n');
				lines.splice(0,1);
				for(var v in lines) {
					var line = lines[v];
					var parsed = line.replace(/\s{2,}/g,' ').split(' ');
					if(parsed.length < 4) continue;
					if(parsed[5] == undefined) {
						parsed[5] = parsed[4];
						parsed[4] = "";
					}
					js.entries.push({
						address : parsed[0],
						hwtype : parsed[1],
						hwaddress : parsed[2],
						flags : parsed[3],
						mask : parsed[4],
						iface : parsed[5],
					});
				}
			}

			return cb(err,js);
		});
	}

	Arp.Set = function(opts, cb) {
		var argv = [], syntax;

		var set_throw_error = function(s) {
			throw new Error("Arp.Set: ERROR => " + s);
			return;
		}

		if(!opts || !cb) {
			return set_throw_error("Incorrect arguments");
		}

		if(!opts.address || (!opts.interface && !opts.hwaddr)) {
			return set_throw_error("Provide an address & interface");
		}

//		argv.push(Private.bin).push('-Ds').push(opts.address).push(opts.interface);
		/*
		 * Can specify interface or hwaddr, not both
		 */
		if(opts.interface && opts.hwaddr) {
			return set_throw_error("Specify one or the other: hwaddr or interface");
		}
		else if(opts.hwaddr) {
			argv = argv.concat(Private.bin).concat('-s').concat(opts.address).concat(opts.hwaddr);
		}
		else if(opts.interface) {
			argv = argv.concat(Private.bin).concat('-Ds').concat(opts.address).concat(opts.interface);
		}
		if(opts.netmask) {
			argv = argv.concat('netmask').concat(opts.netmask);
		}
		var syntax = argv.join(' ');
		console.log("syntax", syntax);
		Cproc.exec(syntax,function(err,stdout,stderr) {
			console.log(syntax,"err,stdout,stderr",err,stdout,stderr);
			var ret, channel
			if(err || stderr.length > 0) {
				ret = false;
				channel = stdout;
			} else {
				ret = true;
				channel = stderr;
			}
			cb(ret,channel);
		});


	}

	Arp.Del = function() {
	}

	Arp.Flush = function() {
	}

	Private.LocateArp = function() {
	}

	Private.Init = function() {
		Private.LocateArp();
	}

	Private.Init();
}

module.exports = _Arp;
