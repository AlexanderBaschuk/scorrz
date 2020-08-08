import { CompetitorId, ResultLine } from "src/model/types";
import { SumAndGrid, calculateGridScores } from "./calculations";
import { getGridScore, getSharedGridScore } from "./gridScores";

test.each`
	place  | expectedResult
	${1}   | ${100}
	${10}  | ${43}
	${50}  | ${1}
	${51}  | ${0}
	${999} | ${0}
`(
	"getGridScore: for place $place",
	({ place, expectedResult }) => {
		const gridResult = getGridScore(place);
		expect(gridResult).toBe(expectedResult);
	},
);

test.each`
	place  | count | expectedResult
	${1}   | ${1}  | ${100}
	${1}   | ${2}  | ${87.5}
	${1}   | ${3}  | ${80}
	${10}  | ${1}  | ${43}
	${10}  | ${2}  | ${42}
	${10}  | ${3}  | ${41}
	${49}  | ${1}  | ${2}
	${49}  | ${2}  | ${1.5}
	${49}  | ${3}  | ${1}
	${50}  | ${1}  | ${1}
	${50}  | ${2}  | ${0.5}
	${50}  | ${3}  | ${0.33}
	${999} | ${1}  | ${0}
	${999} | ${2}  | ${0}
`(
	"getSharedGridScore: $count competitors on place $place",
	({ place, count, expectedResult }) => {
		const gridResult = getSharedGridScore(place, count);
		expect(gridResult).toBeCloseTo(expectedResult, 2);
	},
);

test.each([
	[
		"1 competitor, 1 judge",
		[{ competitorId: "123", score: [55] }],
		[["123", { sum: 55, grid: 100 }]],
	],
	[
		"1 competitor, 3 judges",
		[{ competitorId: "123", score: [55, 60, 70] }],
		[["123", { sum: 185, grid: 100 }]],
	],
	[
		"2 competitors, 1 judge",
		[
			{ competitorId: "123", score: [79] },
			{ competitorId: "234", score: [80] },
		],
		[
			["123", { sum: 79, grid: 75 }],
			["234", { sum: 80, grid: 100 }],
		],
	],
	[
		"4 competitors, 1 judge, shared places",
		[
			{ competitorId: "123", score: [72] },
			{ competitorId: "234", score: [80] },
			{ competitorId: "345", score: [85] },
			{ competitorId: "456", score: [80] },
		],
		[
			["123", { sum: 72, grid: 60 }],
			["234", { sum: 80, grid: 70 }],
			["345", { sum: 85, grid: 100 }],
			["456", { sum: 80, grid: 70 }],
		],
	],
	[
		"4 competitors, 3 judges, shared places",
		[
			{ competitorId: "123", score: [62, 58, 60] },
			{ competitorId: "234", score: [82, 78, 80] },
			{ competitorId: "345", score: [82, 80, 78] },
			{ competitorId: "456", score: [70, 68, 72] },
		],
		[
			["123", { sum: 180, grid: 60 }],
			["234", { sum: 240, grid: 87.5 }],
			["345", { sum: 240, grid: 87.5 }],
			["456", { sum: 210, grid: 65 }],
		],
	],
])(
	"calculateGridScores: %s",
	(
		_description: string,
		scores: ResultLine[],
		expectedGrids: [string, SumAndGrid][],
	) => {
		const result = calculateGridScores(scores);
		const expectedResult = new Map<CompetitorId, SumAndGrid>(expectedGrids);
		expect(result).toEqual(expectedResult);
	},
);
