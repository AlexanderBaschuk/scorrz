import {
	AdjudicatorResults,
	Competitor,
	CompetitorId,
	Round,
	RoundGroup,
	State,
	initialState,
} from "@/types";

export class StateBuilder implements State {
	isLoading: boolean;
	eventTitle: string;
	competitionTitle: string;
	rounds: Round[];
	roundGroups: RoundGroup[];
	competitors: Competitor[];
	results: AdjudicatorResults[];
	selectedAdjudicators: boolean[];
	selectedRound?: number;
	selectedRoundGroup?: number;
	selectedCompetitors: CompetitorId[];

	constructor() {
		Object.assign(this, JSON.parse(JSON.stringify(initialState)));
		this.isLoading = false;
	}

	withRound = (value: Round) => {
		this.rounds.push(value);
		return this;
	};

	withRounds = (values: Round[]) => {
		this.rounds.push(...values);
		return this;
	};

	withRoundGroups = (values: RoundGroup[]) => {
		this.roundGroups.push(...values);
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

	withSelectedRound = (value: number) => {
		this.selectedRound = value;
		return this;
	};

	withSelectedRoundGroup = (value: number) => {
		this.selectedRoundGroup = value;
		return this;
	};

	withSelectedCompetitors = (values: CompetitorId[]) => {
		this.selectedCompetitors = values;
		return this;
	};

	please = (): State => ({ ...this });
}

export const HEAVY: Round = { name: "Heavy", shortName: "H" };
export const LIGHT: Round = { name: "Light", shortName: "L" };
export const SET: Round = { name: "Set", shortName: "S" };

export const RECALL: RoundGroup = { name: "Recall", rounds: [0, 1] };
export const TOTAL: RoundGroup = { name: "total", rounds: [0, 1, 2] };
