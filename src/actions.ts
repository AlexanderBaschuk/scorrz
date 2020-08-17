import { CompetitorId } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const calculate = createAction("CALCULATE");

export const toggleAdjudicator = createAction<number>("TOGGLE_ADJUDICATOR");

export const toggleRound = createAction<number>("TOGGLE_ROUND");

export const selectCompetitor = createAction<CompetitorId>("SELECT_COMPETITOR");
