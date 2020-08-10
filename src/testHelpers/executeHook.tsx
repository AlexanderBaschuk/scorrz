import { Provider } from "react-redux";
import React from "react";
import { mount } from "enzyme";

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
