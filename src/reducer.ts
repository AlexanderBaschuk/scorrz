import {
	calculate as calculateAction,
	toggleAdjudicator,
	toggleCompetitor,
	toggleRound,
} from "./actions";

import { calculateResultTables } from "./helpers/calculateState";
import { createReducer } from "@reduxjs/toolkit";
import { loadStateFromDto } from "./helpers/loadState";
import { testResultsDto } from "./testResultsDto";

const testInitialState = loadStateFromDto(testResultsDto);

export const reducer = createReducer(testInitialState, {
	[calculateAction.type]: (state) => {
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
		return state;
	},
	[toggleAdjudicator.type]: (state, action) => {
		state.selectedAdjudicators[action.payload] = !state.selectedAdjudicators[
			action.payload
		];
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
		return state;
	},
	[toggleRound.type]: (state, action) => {
		state.selectedRounds[action.payload] = !state.selectedRounds[
			action.payload
		];
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
		return state;
	},
	[toggleCompetitor.type]: (state, action) => {
		const competitorIndex = state.selectedCompetitors.findIndex(
			(value) => value === action.payload,
		);
		if (competitorIndex >= 0) {
			state.selectedCompetitors[competitorIndex] = null;
			return state;
		}

		const firstEmptyIndex = state.selectedCompetitors.findIndex(
			(value) => value === null,
		);
		if (firstEmptyIndex >= 0)
			state.selectedCompetitors[firstEmptyIndex] = action.payload;

		return state;
	},
});
