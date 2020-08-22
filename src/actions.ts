import { CompetitionResultsDto } from "./contracts";
import { CompetitorId } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const initResultsRequest = createAction<string>("INIT_RESULTS_REQUEST");
export const initResultsSuccess = createAction<CompetitionResultsDto>(
	"INIT_RESULTS_SUCCESS",
);
export const initResultsFailure = createAction<string>("INIT_RESULTS_FAILURE");

export const toggleAdjudicator = createAction<number>("TOGGLE_ADJUDICATOR");

export const selectRound = createAction<number>("SELECT_ROUND");

export const selectRoundGroup = createAction<number>("SELECT_ROUND_GROUP");

export const toggleCompetitor = createAction<CompetitorId>("TOGGLE_COMPETITOR");
