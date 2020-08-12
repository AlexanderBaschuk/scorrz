import { State } from "./model/types";

export const allResultsSelector = (state: State) => state.results;

export const competitorsSelector = (state: State) => state.competitors;

export const adjudicatorTablesSelector = (state: State) => state.adjudicatorTables;

export const finalTableSelector = (state: State) => state.finalTable;
