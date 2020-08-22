import {
	focusCompetitor,
	initResultsFailure,
	initResultsRequest,
	initResultsSuccess,
	selectRound,
	selectRoundGroup,
	toggleAdjudicator,
	toggleCompetitor,
} from "./actions";

import { createReducer } from "@reduxjs/toolkit";
import { initStateFromDto } from "./helpers/initState";
import { initialState } from "./types";

export const reducer = createReducer(initialState, {
	[initResultsRequest.type]: (state) => {
		state.isLoading = true;
	},
	[initResultsSuccess.type]: (_, action) => {
		return initStateFromDto(action.payload);
	},
	[initResultsFailure.type]: (state, action) => {
		state.isLoading = false;
		state.errorMessage = action.payload;
	},
	[toggleAdjudicator.type]: (state, action) => {
		state.selectedAdjudicators[action.payload] = !state.selectedAdjudicators[
			action.payload
		];
	},
	[selectRound.type]: (state, action) => {
		state.selectedRound = action.payload;
		state.selectedRoundGroup = undefined;
	},
	[selectRoundGroup.type]: (state, action) => {
		state.selectedRoundGroup = action.payload;
		state.selectedRound = undefined;
	},
	[toggleCompetitor.type]: (state, action) => {
		const competitorIndex = state.selectedCompetitors.findIndex(
			(value) => value === action.payload,
		);
		if (competitorIndex >= 0) {
			state.selectedCompetitors[competitorIndex] = null;
		} else {
			const firstEmptyIndex = state.selectedCompetitors.findIndex(
				(value) => value === null,
			);
			if (firstEmptyIndex >= 0)
				state.selectedCompetitors[firstEmptyIndex] = action.payload;
		}
	},
	[focusCompetitor.type]: (state, action) => {
		state.focusedCompetitor = action.payload;
	},
});
