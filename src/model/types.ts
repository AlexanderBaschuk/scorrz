export type CompetitorId = string;

export interface Competitor {
	id: CompetitorId;
	name: string;
	school: string;
}

export interface Adjudicator {
	name: string;
}

export interface Round {
	name: string;
	shortName: string;
}

export interface ResultLine {
	competitorId: CompetitorId;
	score: number[];
	cumulativeSum: number[];
	cumulativeGridScore: number[];
}

export interface AdjudicatorResults {
	adjudicatorId: number;
	resultLines: ResultLine[];
}

export interface IState {
	rounds: Round[];
	adjudicators: Adjudicator[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
}

export const initialState: IState = {
	rounds: [],
	adjudicators: [],
	competitors: [],
	results: [],
};

export const testInitialState: IState = {
	rounds: [
		{ name: "Heavy", shortName: "H" },
		{ name: "Light", shortName: "L" },
		{ name: "Set", shortName: "S" },
	],
	adjudicators: [{ name: "Brian" }, { name: "Mary" }],
	competitors: [
		{ id: "10", name: "Sasha", school: "SchoolName" },
		{ id: "120", name: "John", school: "SchoolName" },
		{ id: "230", name: "Paul", school: "SchoolName" },
		{ id: "340", name: "Mike", school: "SchoolName" },
		{ id: "450", name: "Sandra", school: "SchoolName" },
		{ id: "560", name: "Laura", school: "SchoolName" },
		{ id: "670", name: "Alex", school: "SchoolName" },
	],
	results: [
		{
			adjudicatorId: 0,
			resultLines: [
				{
					competitorId: "10",
					score: [74, 82, 77],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "120",
					score: [82, 74, 77],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "560",
					score: [77, 82, 74],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "340",
					score: [74, 77, 82],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "670",
					score: [82, 77, 74],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "230",
					score: [77, 74, 82],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
			],
		},
		{
			adjudicatorId: 1,
			resultLines: [
				{
					competitorId: "10",
					score: [74, 82, 77],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "120",
					score: [82, 74, 77],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "120",
					score: [77, 82, 74],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "230",
					score: [74, 77, 82],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
				{
					competitorId: "340",
					score: [82, 77, 74],
					cumulativeSum: [0, 0, 0],
					cumulativeGridScore: [100, 200, 300],
				},
			],
		},
	],
};
