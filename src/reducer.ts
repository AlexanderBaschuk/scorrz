import { State, initialState } from "./types";
import {
	calculate,
	loadState,
	toggleAdjudicator,
	toggleCompetitor,
	toggleRound,
} from "./actions";

import { calculateResultTables } from "./helpers/calculateState";
import { createReducer } from "@reduxjs/toolkit";
import { loadStateFromDto } from "./helpers/loadState";

export const reducer = createReducer(initialState, {
	[loadState.type]: (_, action) => {
		const state = loadStateFromDto(action.payload);
		return calculateState(state);
	},
	[calculate.type]: (state) => {
		return calculateState(state);
	},
	[toggleAdjudicator.type]: (state, action) => {
		state.selectedAdjudicators[action.payload] = !state.selectedAdjudicators[
			action.payload
		];
		return calculateState(state);
	},
	[toggleRound.type]: (state, action) => {
		state.selectedRounds[action.payload] = !state.selectedRounds[
			action.payload
		];
		return calculateState(state);
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

const calculateState = (state: State) => {
	[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	return state;
};
