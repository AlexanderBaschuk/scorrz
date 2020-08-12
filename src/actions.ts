import { createAction } from "@reduxjs/toolkit";

export const calculate = createAction("CALCULATE");
export const toggleAdjudicator = createAction<number>(
	"SELECT_ADJUDICATOR",
);
