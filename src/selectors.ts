import { State } from "./types";
import { createSelector } from "@reduxjs/toolkit";

export const loadingSelector = (state: State) => state.isLoading;

export const errorMessageSelector = (state: State) => state.errorMessage;

export const eventTitleSelector = (state: State) => state.eventTitle;

export const competitionTitleSelector = (state: State) =>
	state.competitionTitle;

export const resultsSelector = (state: State) => state.results;

export const adjudicatorsSelector = createSelector(resultsSelector, (results) =>
	results.map((r) => r.adjudicatorName),
);

export const roundsSelector = (state: State) => state.rounds;

export const roundsNamesSelector = createSelector(roundsSelector, (rounds) =>
	rounds.map((round) => round.name),
);

export const competitorsSelector = (state: State) => state.competitors;

export const selectedAdjudicatorsSelector = (state: State) =>
	state.selectedAdjudicators;

export const selectedRoundsSelector = (state: State) => state.selectedRounds;

export const selectedCompetitorsSelector = (state: State) =>
	state.selectedCompetitors;
