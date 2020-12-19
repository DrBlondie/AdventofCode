const readline = require('readline');
const fs = require('fs');

module.exports = {
	getFileAsStringArray: async (filename) => {
		const arr = [];
		filename = '2020\\' + filename; 
		const readInterface = readline.createInterface({
			input: fs.createReadStream(filename),
			output: process.stdout,
			console: false
		});
		return new Promise((resolve, reject) => {
			readInterface.on('line', line => {
				arr.push(line);
			});

			readInterface.on('close', () => {
				return resolve(arr);
			});
		});
	}
};