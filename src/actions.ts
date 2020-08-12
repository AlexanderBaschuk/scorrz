import { createAction } from "@reduxjs/toolkit";

export const calculate = createAction("CALCULATE");
export const selectAdjudicator = createAction<number | null>(
	"SELECT_ADJUDICATOR",
);
