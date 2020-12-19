const fr = require('./fileReader');
const pattern = ['..##.......',
	'#...#...#..',
	'.#....#..#.',
	'..#.#...#.#',
	'.#...##..#.',
	'..#.##.....',
	'.#.#.#....#',
	'.#........#',
	'#.##...#...',
	'#...##....#',
	'.#..#...#.#']

function parsePattern(pattern, right, down) {
	let treesHit = 0;
	let horiz = 0,
		vert = 0;
	while(vert < pattern.length) {
		const row = pattern[vert];
		if(row[horiz] === '#') {
			treesHit++;
		}
		horiz += right;
		horiz %= row.length;
		vert += down;
	}
	return treesHit;
}

function part1(file) {
	console.log(parsePattern(file, 3, 1));
}

function part2(file) {
	const paths = [[1,1], [3,1], [5,1], [7,1], [1,2]];
	const resps = [];
	let answer = 1;
	for(let i = 0; i < paths.length; i++) {
		const currPath = paths[i];
		const resp = parsePattern(file, currPath[0], currPath[1]);
		resps.push(resp);
		answer *= resp;
	}
	console.log(answer);
}

async function start() {
	const file = await fr.getFileAsStringArray('./inputs/day3/p1.txt');
	part1(file);
	part2(file);
}

start();