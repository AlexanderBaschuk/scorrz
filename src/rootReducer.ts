import {
	calculate as calculateAction,
	toggleAdjudicator,
	toggleRound,
} from "./actions";

import { calculateResultTables } from "./calculateState";
import { createReducer } from "@reduxjs/toolkit";
import { testInitialState } from "./model/types";

export const rootReducer = createReducer(testInitialState, {
	[calculateAction.type]: (state) => {
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	},
	[toggleAdjudicator.type]: (state, action) => {
		state.selectedAdjudicators[action.payload] = !state.selectedAdjudicators[
			action.payload
		];
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	},
	[toggleRound.type]: (state, action) => {
		state.selectedRounds[action.payload] = !state.selectedRounds[
			action.payload
		];
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	},
});
