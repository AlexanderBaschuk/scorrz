import {
	AdjudicatorResults,
	AdjudicatorTableView,
	Competitor,
	CompetitorId,
	FinalTableView,
	Round,
	State,
	initialState,
} from "@/types";

export class StateBuilder implements State {
	isLoading: boolean;
	eventTitle: string;
	competitionTitle: string;
	rounds: Round[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
	selectedAdjudicators: boolean[];
	selectedRounds: boolean[];

	adjudicatorTables: AdjudicatorTableView[];
	finalTable: FinalTableView;
	selectedCompetitors: CompetitorId[];

	constructor() {
		Object.assign(this, JSON.parse(JSON.stringify(initialState)));
		this.isLoading = false;
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

	withSelectedCompetitors = (values: CompetitorId[]) => {
		this.selectedCompetitors = values;
		return this;
	};
}

export const HEAVY: Round = { name: "Heavy", shortName: "H" };
export const LIGHT: Round = { name: "Light", shortName: "L" };
export const SET: Round = { name: "Set", shortName: "S" };
