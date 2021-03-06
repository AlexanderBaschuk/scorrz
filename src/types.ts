export type CompetitorId = string;

export type Score = number | undefined;

export type CompetitorSelectionIndex = number | null;

export enum DisplayMode {
	SingleRounds,
	Championship,
}

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

export interface FinalTableView {
	results: FinalTableRowView[];
}

export interface FinalTableRowView {
	place: number;
	id: CompetitorId;
	name: string;
	school: string;
	gridSum: Score;
}

export interface State {
	isLoading: boolean;
	errorMessage?: string;
	eventTitle: string;
	competitionTitle: string;
	rounds: Round[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
	selectedAdjudicators: boolean[];
	selectedRound?: number;
	selectedChampionshipRound?: number;
	selectedCompetitors: CompetitorId[];
	focusedCompetitor?: CompetitorId;
}

export const initialState: State = {
	isLoading: true,
	eventTitle: "",
	competitionTitle: "",
	rounds: [],
	competitors: [],
	results: [],
	selectedAdjudicators: [],
	selectedRound: undefined,
	selectedChampionshipRound: 1,
	selectedCompetitors: [null, null, null, null, null],
};
