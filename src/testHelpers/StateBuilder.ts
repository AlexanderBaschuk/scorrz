import {
	AdjudicatorResults,
	Competitor,
	CompetitorId,
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
	selectedRound?: number;
	selectedChampionshipRound?: number;
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
		this.selectedChampionshipRound = undefined;
		return this;
	};

	withSelectedChampionshipRound = (value: number) => {
		this.selectedChampionshipRound = value;
		this.selectedRound = undefined;
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
