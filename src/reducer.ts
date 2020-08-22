import {
	initResultsFailure,
	initResultsRequest,
	initResultsSuccess,
	toggleAdjudicator,
	toggleCompetitor,
	toggleRound,
} from "./actions";

import { createReducer } from "@reduxjs/toolkit";
import { initStateFromDto } from "./helpers/initState";
import { initialState } from "./types";

export const reducer = createReducer(initialState, {
	[initResultsRequest.type]: (state) => {
		state.isLoading = true;
		return state;
	},
	[initResultsSuccess.type]: (_, action) => {
		const state = initStateFromDto(action.payload);
		return state;
	},
	[initResultsFailure.type]: (state, action) => {
		state.isLoading = false;
		state.errorMessage = action.payload;
		return state;
	},
	[toggleAdjudicator.type]: (state, action) => {
		state.selectedAdjudicators[action.payload] = !state.selectedAdjudicators[
			action.payload
		];
		return state;
	},
	[toggleRound.type]: (state, action) => {
		state.selectedRounds[action.payload] = !state.selectedRounds[
			action.payload
		];
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
