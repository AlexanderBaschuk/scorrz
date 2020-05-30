import { IState } from "./model/types";
import { createSelector } from "@reduxjs/toolkit";

export const adjudicatorsSelector = (state: IState) => state.adjudicators;

export const allResultsSelector = (state: IState) => state.results;

export const competitorsSelector = (state: IState) => state.competitors;

export const resultsSelector = createSelector(
	allResultsSelector,
	(allResults) => allResults,
);
