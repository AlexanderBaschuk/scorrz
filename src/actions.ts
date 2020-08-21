import { CompetitionResultsDto } from "./contracts";
import { CompetitorId } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const initResultsRequest = createAction<string>("INIT_RESULTS_REQUEST");
export const initResultsSuccess = createAction<CompetitionResultsDto>(
	"INIT_RESULTS_SUCCESS",
);
export const initResultsFailure = createAction<string>("INIT_RESULTS_FAILURE");

export const calculate = createAction("CALCULATE");

export const toggleAdjudicator = createAction<number>("TOGGLE_ADJUDICATOR");

export const toggleRound = createAction<number>("TOGGLE_ROUND");

export const toggleCompetitor = createAction<CompetitorId>("TOGGLE_COMPETITOR");
