import { CompetitionResultsDto } from "./contracts";
import { CompetitorId } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const loadState = createAction<CompetitionResultsDto>("LOAD");

export const calculate = createAction("CALCULATE");

export const toggleAdjudicator = createAction<number>("TOGGLE_ADJUDICATOR");

export const toggleRound = createAction<number>("TOGGLE_ROUND");

export const toggleCompetitor = createAction<CompetitorId>("TOGGLE_COMPETITOR");
