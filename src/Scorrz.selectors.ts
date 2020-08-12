import { State } from "./model/types";

export const adjudicatorsSelector = (state: State) => state.results.map(results => results.adjudicatorName);

export const allResultsSelector = (state: State) => state.results;

export const competitorsSelector = (state: State) => state.competitors;

export const selectedAdjudicatorsSelector = (state: State) => state.selectedAdjudicators;

export const adjudicatorTablesSelector = (state: State) => state.adjudicatorTables;

export const finalTableSelector = (state: State) => state.finalTable;
