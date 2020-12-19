const fr = require('./fileReader');

function getPlacement(inp, min, max, interval, i, maxInp, letterMatch) {
	for (; i < maxInp; i++) {
		if (inp[i] === letterMatch) {
			max = max - interval;
		} else {
			min = min + interval;
		}
		interval = Math.floor(interval / 2);
	}
	if (min !== max) {
		throw 'no seat found';
	}
	return min;
}

function parsePlacements(file) {
	const placements = [];
	for (let line of file) {
		const row = getPlacement(line, 0, 127, 64, 0, 7, 'F');
		const col = getPlacement(line, 0, 7, 4, 7, 10, 'L');
		const seatID = (8 * row) + col;
		placements.push([row, col, seatID]);
	}
	return placements;
}

function part1(inp) {
	const placements = parsePlacements(inp);
	console.log('max seatID: ' + Math.max.apply(Math, placements.map(p => p[2])));
}

function part2(inp) {
	const placements = parsePlacements(inp);
	const seatNums = placements.map(p => Number(p[2]));
	seatNums.sort((a, b) => a - b);
	let missingNum = -1;
	for (let i = 0; i < seatNums.length - 1; i++) {
		if (seatNums[i] + 1 !== seatNums[i + 1]) {
			missingNum = seatNums[i] + 1;
			break;
		}
	}
	console.log('your seat: ' + missingNum);
}

async function start() {
	const file = await fr.getFileAsStringArray('./inputs/day5/p1.txt');
	part1(file);
	part2(file);
}

start();