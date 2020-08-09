import { Provider } from "react-redux";
import React from "react";
import createMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import { testInitialState } from "./model/types";
import { useResults } from "./useResults";

const createStore = () => {
	const mockStore = createMockStore();
	const store = mockStore(testInitialState);
	store.clearActions();
	return store;
};

export const renderConnectedHook = <T extends any, P extends any>(
	hook: (arg0: P) => T,
	hookParams: P,
	store: any,
): T => {
	let hookResult: T;

	const HookWrapper = ({ hook, hookParams }) => {
		hookResult = hook(hookParams);
		return null;
	};

	shallow(
		<Provider store={store}>
			<HookWrapper hook={hook} hookParams={hookParams}/>
		</Provider>,
	);
	return hookResult;
};

it("test hook", () => {
	const store = createStore();
	const hookResult = renderConnectedHook(useResults, undefined, store);
	expect(hookResult).toBeDefined()
});
