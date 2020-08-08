export const gridScores = new Map<number, number>([
	[1, 100],
	[2, 75],
	[3, 65],
	[4, 60],
	[5, 56],
	[6, 53],
	[7, 50],
	[8, 47],
	[9, 45],
	[10, 43],
	[11, 41],
	[12, 39],
	[13, 38],
	[14, 37],
	[15, 36],
	[16, 35],
	[17, 34],
	[18, 33],
	[19, 32],
	[20, 31],
	[21, 30],
	[22, 29],
	[23, 28],
	[24, 27],
	[25, 26],
	[26, 25],
	[27, 24],
	[28, 23],
	[29, 22],
	[30, 21],
	[31, 20],
	[32, 19],
	[33, 18],
	[34, 17],
	[35, 16],
	[36, 15],
	[37, 14],
	[38, 13],
	[39, 12],
	[40, 11],
	[41, 10],
	[42, 9],
	[43, 8],
	[44, 7],
	[45, 6],
	[46, 5],
	[47, 4],
	[48, 3],
	[49, 2],
	[50, 1],
]);

export const getGridScore = (place: number): number => {
	return gridScores.has(place) ? gridScores.get(place) : 0;
};

export const getSharedGridScore = (place: number, competitorsCount: number): number => {
	let result = 0;
	for (let pl = place; pl < place + competitorsCount; pl++) {
		result += getGridScore(pl);
	}
	return competitorsCount === 0 ? result : result / competitorsCount;
};
