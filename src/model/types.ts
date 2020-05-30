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
