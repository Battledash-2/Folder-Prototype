const folderPrototype = (proto, folder, pass=[], wrapObjects=false, protot=false) => {
	wrapObjects = wrapObjects || function(o){return o};
	if (typeof pass === 'function') { wrapObjects = pass; pass = []; };

	const functions = fs.readdirSync(path.join(__dirname, folder)).filter(fn=>!fn.includes('.test'));
	const loadFiles = (functions, as='', opath='') => {
		for (let file of functions) {
			if (fs.lstatSync(path.join(__dirname, folder, opath, file)).isDirectory()) {
				let az = as === '' ? file : as + '.' + file;
				loadFiles(fs.readdirSync(path.join(__dirname, folder, opath, file)).filter(fn=>!fn.includes('.test')), az, path.join(opath, file));
				continue;
			}
			let p;
			if (typeof p === 'function' && !protot) p = proto.prototype;
			if (typeof p === 'function' && protot) p = proto.__proto__;
			else p = proto;
			if (as !== '') {
				for (let a of as.split('.')) {
					if (!p.hasOwnProperty(a)) p[a] = wrapObjects({});
					p = p[a];
				}
			}
			p[(file.endsWith('.js')) ? file.slice(0, -3) : file] = require(path.join(__dirname, folder, opath, file))(...pass);
		}
	}
	loadFiles(functions);
}

module.exports = folderPrototype;