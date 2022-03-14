const folderPrototype = (proto, folder, pass=[]) => {
	const functions = fs.readdirSync(path.join(__dirname, folder)).filter(fn=>!fn.includes('.test'));
	const loadFiles = (functions, as='', opath='') => {
		for (let file of functions) {
			if (fs.lstatSync(path.join(__dirname, folder, opath, file)).isDirectory()) {
				let az = as === '' ? file : as + '.' + file;
				loadFiles(fs.readdirSync(path.join(__dirname, folder, opath, file)).filter(fn=>!fn.includes('.test')), az, path.join(opath, file));
				continue;
			}
			let p = proto.prototype;
			if (as !== '') {
				for (let a of as.split('.')) {
					if (!p.hasOwnProperty(a)) p[a] = {};
					p = p[a];
				}
			}
			p[(file.endsWith('.js')) ? file.slice(0, -3) : file] = require(path.join(__dirname, folder, opath, file))(...pass);
		}
	}
	loadFiles(functions);
}

module.exports = folderPrototype;