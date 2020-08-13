import {
	AdjudicatorResults,
	AdjudicatorTableView,
	Competitor,
	FinalTableView,
	Round,
	State,
	initialState,
} from "@/model/types";

export class StateBuilder implements State {
	rounds: Round[] = [];
	competitors: Competitor[] = [];
	results: AdjudicatorResults[] = [];
	selectedAdjudicators: boolean[];
	selectedRounds: boolean[];

	adjudicatorTables: AdjudicatorTableView[];
	finalTable: FinalTableView;

	constructor() {
		Object.assign(this, JSON.parse(JSON.stringify(initialState)));
	}

	withRound = (value: Round) => {
		this.rounds.push(value);
		this.selectedRounds.push(true);
		return this;
	};

	withRounds = (values: Round[]) => {
		this.rounds.push(...values);
		this.selectedRounds.push(...values.map((_) => true));
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
		this.selectedAdjudicators[adjudicatorId] = true;
		return this;
	};

	withSelectedAdjudicators = (values: boolean[]) => {
		this.selectedAdjudicators = values;
		return this;
	};

	withSelectedRounds = (values: boolean[]) => {
		this.selectedRounds = values;
		return this;
	};
}

export const HEAVY: Round = { name: "Heavy", shortName: "H" };
export const LIGHT: Round = { name: "Light", shortName: "L" };
export const SET: Round = { name: "Set", shortName: "S" };
