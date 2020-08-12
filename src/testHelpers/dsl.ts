import { State, initialState } from "@/model/types";

import { AdjudicatorResultsBuilder } from "./AdjudicatorResultsBuilder";
import { StateBuilder } from "./StateBuilder";
import createMockStore from "redux-mock-store";

export const createStore = (state?: State) => {
	const mockStore = createMockStore();
	const store = mockStore(state ?? initialState);
	return store;
};

export class Create {
	public static store = (state?: State) => {
		const mockStore = createMockStore();
		return mockStore(state ?? initialState);
	};

	public static state = () => new StateBuilder();

	public static adjudicator = () =>
		new AdjudicatorResultsBuilder();
}
