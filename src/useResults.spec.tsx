import { Create } from "./testHelpers/dsl";
import { Provider } from "react-redux";
import React from "react";
import { mount } from "enzyme";
import { useResults } from "./useResults";

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

it("hook test attempt", () => {
	const state = Create.state()
		.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
		.withResults(0, Create.adjudicator().withResult("123", [75, 77, 72]));
	const store = Create.store(state);
	const hookResult = executeHookWithStore(() => useResults(), store);
	expect(hookResult.resultsByAdjudicators[0].resultLines[0].sum).toBe(
		75 + 77 + 72,
	);
});

// TODO. Test that it works  correctly when competitor with id doesn't exist
