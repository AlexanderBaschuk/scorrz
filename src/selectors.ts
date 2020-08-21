import { State } from "./types";

export const loadingSelector = (state: State) => state.isLoading;

export const errorMessageSelector = (state: State) => state.errorMessage;

export const eventTitleSelector = (state: State) => state.eventTitle;

export const competitionTitleSelector = (state: State) => state.competitionTitle;

export const adjudicatorsSelector = (state: State) => state.results.map(results => results.adjudicatorName);

export const roundsNamesSelector = (state: State) => state.rounds.map(round => round.name);

export const allResultsSelector = (state: State) => state.results;

export const competitorsSelector = (state: State) => state.competitors;

export const selectedAdjudicatorsSelector = (state: State) => state.selectedAdjudicators;

export const selectedRoundsSelector = (state: State) => state.selectedRounds;

export const adjudicatorTablesSelector = (state: State) => state.adjudicatorTables;

export const finalTableSelector = (state: State) => state.finalTable;

export const selectedCompetitorsSelector = (state: State) => state.selectedCompetitors;
