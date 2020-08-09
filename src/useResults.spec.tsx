import { Provider } from "react-redux";
import React from "react";
import createMockStore from "redux-mock-store";
import { mount } from "enzyme";
import { testInitialState } from "./model/types";
import { useResults } from "./useResults";

const createStore = () => {
	const mockStore = createMockStore();
	const store = mockStore(testInitialState);
	store.clearActions();
	return store;
};

export const executeHookWithStore = <T extends any>(
	hook: () => T,
	store: any,
): T => {
	let hookResult: T;

	const HookWrapper = () => {
		hookResult = hook();
		return null;
	};

	mount(
		<Provider store={store}>
			<HookWrapper />
		</Provider>,
	);
	return hookResult;
};

it("test hook", () => {
	const store = createStore();
	const hookResult = executeHookWithStore(() => useResults(), store);
	expect(hookResult).toBeDefined()
});
