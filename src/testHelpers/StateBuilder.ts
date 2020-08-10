import {
	AdjudicatorResults,
	Competitor,
	Round,
	State,
	initialState,
} from "@/model/types";

export class StateBuilder implements State {
	rounds: Round[] = [];
	competitors: Competitor[] = [];
	results: AdjudicatorResults[] = [];

	constructor() {
		Object.assign(this, JSON.parse(JSON.stringify(initialState)));
	}

	withRound = (value: Round) => {
		this.rounds.push(value);
		return this;
	};

	withRounds = (values: Round[]) => {
		this.rounds.push(...values);
		return this;
	};

	withCompetitor = (value: Competitor) => {
		this.competitors.push(value);
		return this;
	};

	withCompetitors = (values: Competitor[]) => {
		this.competitors.push(...values);
		return this;
	};

	withResults = (adjudicatorId: number, results: AdjudicatorResults) => {
		this.results[adjudicatorId] = results;
		return this;
	};
}