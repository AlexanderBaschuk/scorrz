import { CompetitorId, ResultLine } from "@/redux/types";
import {
	GridSumAndPlace,
	SumAndGrid,
	calculateFinalResults,
	calculateGridScores,
} from "./calculations";
import { getGridScore, getSharedGridScore } from "./gridScores";

test.each`
	place  | expectedResult
	${1}   | ${100}
	${10}  | ${43}
	${50}  | ${1}
	${51}  | ${0}
	${999} | ${0}
`("getGridScore: for place $place", ({ place, expectedResult }) => {
	const gridResult = getGridScore(place);
	expect(gridResult).toBe(expectedResult);
});

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
		"1 adjudicator, 1 competitor",
		[{ competitorId: "123", score: [55] }],
		[["123", { sum: 55, grid: 100 }]],
	],
	[
		"3 adjudicators, 1 competitor",
		[{ competitorId: "123", score: [55, 60, 70] }],
		[["123", { sum: 185, grid: 100 }]],
	],
	[
		"1 adjudicator, 2 competitors",
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
		"1 adjudicator, 4 competitors, shared places",
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
		"3 adjudicators, 4 competitors, shared places",
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
		expectedGrids: [CompetitorId, SumAndGrid][],
	) => {
		const result = calculateGridScores(scores);
		const expectedResult = new Map<CompetitorId, SumAndGrid>(expectedGrids);
		expect(result).toEqual(expectedResult);
	},
);

test.each([
	[
		"1 adjudicator, 1 competitor",
		[[["123", 300]]],
		[["123", { gridSum: 300, place: 1 }]],
	],
	[
		"1 adjudicator, 3 competitors",
		[
			[
				["345", 75],
				["123", 65],
				["234", 100],
			],
		],
		[
			["234", { gridSum: 100, place: 1 }],
			["345", { gridSum: 75, place: 2 }],
			["123", { gridSum: 65, place: 3 }],
		],
	],
	[
		"3 adjudicators, 1 competitor",
		[[["123", 100]], [["123", 100]], [["123", 100]]],
		[["123", { gridSum: 300, place: 1 }]],
	],
	[
		"2 adjudicators, 3 competitors",
		[
			[
				["123", 65],
				["345", 75],
				["234", 100],
			],
			[
				["345", 87.5],
				["234", 100],
				["123", 87.5],
			],
		],
		[
			["234", { gridSum: 200, place: 1 }],
			["345", { gridSum: 162.5, place: 2 }],
			["123", { gridSum: 152.5, place: 3 }],
		],
	],
	[
		"2 adjudicators, 3 competitors, some values absent",
		[
			[
				["123", 75],
				["234", 100],
			],
			[
				["345", 65],
				["234", 100],
			],
		],
		[
			["234", { gridSum: 200, place: 1 }],
			["123", { gridSum: 75, place: 2 }],
			["345", { gridSum: 65, place: 3 }],
		],
	],
	[
		"2 adjudicators, 4 competitors, shared places",
		[
			[
				["234", 100],
				["345", 75],
				["123", 65],
				["456", 60],
			],
			[
				["234", 100],
				["345", 65],
				["123", 75],
				["456", 60],
			],
		],
		[
			["234", { gridSum: 200, place: 1 }],
			["123", { gridSum: 140, place: 2 }],
			["345", { gridSum: 140, place: 2 }],
			["456", { gridSum: 120, place: 4 }],
		],
	],
])(
	"calculateFinalResults: %s",
	(
		_description: string,
		allGrids: [CompetitorId, number][][],
		expectedFinalResults: [CompetitorId, GridSumAndPlace][],
	) => {
		const allGridsMaps = allGrids.map(
			(adjGrids) => new Map<CompetitorId, number>(adjGrids),
		);
		const result = calculateFinalResults(allGridsMaps);
		const expectedResult = new Map<CompetitorId, GridSumAndPlace>(
			expectedFinalResults,
		);
		expect(result).toEqual(expectedResult);
	},
);
