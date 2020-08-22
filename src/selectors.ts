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

export const roundGroupsSelector = (state: State) => state.roundGroups;

export const roundGroupNamesSelector = createSelector(roundGroupsSelector, (groups) =>
groups.map((group) => group.name),
);

export const competitorsSelector = (state: State) => state.competitors;

export const selectedAdjudicatorsSelector = (state: State) =>
	state.selectedAdjudicators;

export const selectedRoundSelector = (state: State) => state.selectedRound;

export const selectedRoundGroupSelector = (state: State) =>
	state.selectedRoundGroup;

export const selectedRoundsSelector = createSelector(
		roundsSelector,
		roundGroupsSelector,
		selectedRoundSelector,
		selectedRoundGroupSelector,
		(rounds, roundGroups, selectedRound, selectedRoundGroup) => {
			if (selectedRoundGroup !== undefined)
				return rounds.map((_, i) =>
					roundGroups[selectedRoundGroup].rounds.includes(i),
				);

			return rounds.map((_, i) => selectedRound === i);
		},
	);

export const selectedCompetitorsSelector = (state: State) =>
	state.selectedCompetitors;
