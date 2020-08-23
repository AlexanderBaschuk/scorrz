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

export const roundShortNamesSelector = createSelector(
	roundsSelector,
	(rounds) => rounds.map((round) => round.shortName),
);

export const competitorsSelector = (state: State) => state.competitors;

export const selectedAdjudicatorsSelector = (state: State) =>
	state.selectedAdjudicators;

export const selectedRoundSelector = (state: State) => state.selectedRound;

export const selectedChampionshipRoundSelector = (state: State) =>
	state.selectedChampionshipRound;

export const selectedRoundsSelector = createSelector(
	roundsSelector,
	selectedRoundSelector,
	selectedChampionshipRoundSelector,
	(rounds, selectedRound, selectedChampionshipRound) => {
		if (selectedChampionshipRound !== undefined)
			return rounds.map((_, i) => i <= selectedChampionshipRound);

		return rounds.map((_, i) => selectedRound === i);
	},
);

export const selectedCompetitorsSelector = (state: State) =>
	state.selectedCompetitors;

export const focusedCompetitorSelector = (state: State) =>
	state.focusedCompetitor;
