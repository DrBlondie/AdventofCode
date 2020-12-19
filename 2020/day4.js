const fr = require('./fileReader');

function createPassport(passportItems) {
	const pp = {};
	for (let item of passportItems) {
		const parts = item.split(':');
		pp[parts[0]] = parts[1];
	}
	return pp;
}

function createPPListFromFile(file) {
	let ppParse = [];
	const ppList = [];
	for (let line of file) {
		if (line === '') {
			ppList.push(createPassport(ppParse));
			ppParse = [];
		} else {
			ppParse = ppParse.concat(line.split(' '));
		}
	}
	ppList.push(createPassport(ppParse));
	return ppList;
}

function doesPPPassP1(pp) {
	const length = Object.keys(pp).length;
	return length === 8 || (length === 7 && pp.cid === undefined);
}

function failYear(yr, min, max) {
	return yr.length !== 4 || yr < min || yr > max;
}
function checkHeight(height) {
	function getSize() {
		return height.substring(0, height.length - 2);
	}
	if (height.includes('cm')) {
		const size = getSize();
		if (!(size < 150 || size > 193)) {
			return false;
		}
	} else if (height.includes('in')) {
		const size = getSize();
		if (!(size < 59 || size > 76)) {
			return false;
		}
	}
	return true;
}
function checkHairColor(color) {
	const regex = new RegExp(/\#[a-f0-9]{6}/);
	return color.match(regex);
}
function checkEyeColor(color) {
	const regex = new RegExp(/(amb|blu|brn|gry|grn|hzl|oth)/);
	return color.match(regex);
}

function doesPPPassP2(pp) {
	const length = Object.keys(pp).length;
	if (length === 8 || (length === 7 && pp.cid === undefined)) {
		if (failYear(pp.byr, 1920, 2002)) {
			return false;
		}
		if (failYear(pp.iyr, 2010, 2020)) {
			return false;
		}
		if (failYear(pp.eyr, 2020, 2030)) {
			return false;
		}
		if (checkHeight(pp.hgt)) {
			return false;
		}
		if(!checkEyeColor(pp.ecl)) {
			return false;
		}
		if (!checkHairColor(pp.hcl)) {
			return false;
		}
		if (pp.pid.length !== 9) {
			return false;
		}
		return true;
	}
	return false;
}

function countPPPass(ppList) {
	let pass = 0;

	for (let pp of ppList) {
		if (doesPPPassP1(pp)) {
			pass++;
		}
	}
	console.log(pass);
}

function countPPPassP2(ppList) {
	let pass = 0;
	console.log('');
	for (let pp of ppList) {
		if (doesPPPassP2(pp)) {
			pass++;
		}
	}
	console.log(pass);
}



function part1(file) {
	countPPPass(createPPListFromFile(file));
}

function part2(file) {
	countPPPassP2(createPPListFromFile(file));
}



async function start() {
	const file = await fr.getFileAsStringArray('./inputs/day4/p1.txt');
	part1(file);
	part2(file);
}

start();