import { calculate as calculateAction, selectAdjudicator } from "./actions";

import { calculateResultTables } from "./calculateState";
import { createReducer } from "@reduxjs/toolkit";
import { testInitialState } from "./model/types";

export const rootReducer = createReducer(testInitialState, {
	[calculateAction.type]: (state) => {
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	},
	[selectAdjudicator.type]: (state, action) => {
		state.selectedAdjudicator = action.payload;
		[state.adjudicatorTables, state.finalTable] = calculateResultTables(state);
	},
});
