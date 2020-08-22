export type CompetitorId = string;

export type Score = number | undefined;

export type CompetitorSelectionIndex = number | null;

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

export interface RoundGroup {
	name: string;
	rounds: number[];
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

export interface FinalTableView {
	results: FinalTableRowView[];
}

export interface FinalTableRowView {
	place: number;
	id: CompetitorId;
	name: string;
	gridSum: Score;
}

export interface State {
	isLoading: boolean;
	errorMessage?: string;
	eventTitle: string;
	competitionTitle: string;
	rounds: Round[];
	roundGroups: RoundGroup[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
	selectedAdjudicators: boolean[];
	selectedRounds: boolean[];
	selectedCompetitors: CompetitorId[];
}

export const initialState: State = {
	isLoading: true,
	eventTitle: "",
	competitionTitle: "",
	rounds: [],
	roundGroups: [
		{ name: "Recall", rounds: [0, 1] },
		{ name: "Total", rounds: [0, 1, 2] },
	],
	competitors: [],
	results: [],
	selectedAdjudicators: [],
	selectedRounds: [],
	selectedCompetitors: [null, null, null, null, null],
};
