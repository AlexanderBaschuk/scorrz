import { FinalTableProps } from "@/FinalTable/FinalTable";

export type CompetitorId = string;

export type Score = number | undefined;

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
}

export interface AdjudicatorResults {
	adjudicatorName: string;
	resultLines: ResultLine[];
}

export interface AdjudicatorTableView {
	adjudicatorName: string;
	rounds: string[];
	resultRows: AdjudicatorTableRowView[];
}

export interface AdjudicatorTableRowView {
	id: CompetitorId;
	name: string;
	scores: Score[];
	sum: Score;
	gridScore: Score;
}

export interface State {
	rounds: Round[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
	selectedAdjudicators: boolean[];
	selectedRounds: boolean[];
	adjudicatorTables: AdjudicatorTableView[];
	finalTable: FinalTableProps;
}

export const initialState: State = {
	rounds: [],
	competitors: [],
	results: [],
	selectedAdjudicators: [],
	selectedRounds: [],
	adjudicatorTables: [],
	finalTable: { results: [] },
};

export const testInitialState: State = {
	rounds: [
		{ name: "Heavy", shortName: "H" },
		{ name: "Light", shortName: "L" },
		{ name: "Set", shortName: "S" },
	],
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
			adjudicatorName: "Brendan O'Brian",
			resultLines: [
				{
					competitorId: "10",
					score: [74, 82, 77],
				},
				{
					competitorId: "120",
					score: [82, 75, 77],
				},
				{
					competitorId: "560",
					score: [77, 82, 74],
				},
				{
					competitorId: "340",
					score: [74, 77, 82],
				},
				{
					competitorId: "670",
					score: [82, 77, 75],
				},
				{
					competitorId: "230",
					score: [77, 75, 82],
				},
			],
		},
		{
			adjudicatorName: "Mary McElroy",
			resultLines: [
				{
					competitorId: "10",
					score: [74, 82, 77],
				},
				{
					competitorId: "120",
					score: [82, 74, 77],
				},
				{
					competitorId: "560",
					score: [77, 82, 74],
				},
				{
					competitorId: "230",
					score: [74, 77, 82],
				},
				{
					competitorId: "340",
					score: [82, 77, 74],
				},
			],
		},
		{
			adjudicatorName: "John Cullinane",
			resultLines: [
				{
					competitorId: "10",
					score: [74, 82, 77],
				},
				{
					competitorId: "230",
					score: [74, 77, 82],
				},
				{
					competitorId: "670",
					score: [82, 77, 75],
				},
				{
					competitorId: "340",
					score: [82, 77, 74],
				},
			],
		},
	],
	selectedAdjudicators: [true, true, true],
	selectedRounds: [true, true, true],
	adjudicatorTables: [],
	finalTable: { results: [] },
};
