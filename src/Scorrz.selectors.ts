import { State } from "./model/types";

export const allResultsSelector = (state: State) => state.results;

export const competitorsSelector = (state: State) => state.competitors;
