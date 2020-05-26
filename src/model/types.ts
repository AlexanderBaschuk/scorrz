export type CompetitorId = string;

export interface Competitor {
	id: CompetitorId;
	name: string;
	school: string;
}

export interface Adjudicator {
	id: number;
	name: string;
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
	dummy: string;
}

export const initialState: IState = {
	dummy: "hello",
};
