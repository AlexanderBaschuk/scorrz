import { HEAVY, LIGHT, SET } from "./testHelpers/StateBuilder";
import { toggleAdjudicator, toggleRound } from "./actions";

import { Create } from "./testHelpers/dsl";
import { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { Store } from "@reduxjs/toolkit";
import { mount } from "enzyme";

const adjudicator1 = "Brendan O'Brian";
const adjudicator2 = "Mary McElroy";

const prepareStore = (): MockStore => {
	const state = Create.state()
		.withRounds([HEAVY, LIGHT, SET])
		.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
		.withResults(
			0,
			Create.adjudicator()
				.withName(adjudicator1)
				.withResult("123", [60, 70, 80]),
		)
		.withResults(
			1,
			Create.adjudicator()
				.withName(adjudicator2)
				.withResult("123", [62, 61, 60]),
		);
	return Create.store(state);
};

const mountScorrz = (store: MockStore) => {
	const scorrz = mount(
		<Provider store={store}>
			<Scorrz />
		</Provider>,
	);
	store.clearActions();
	return scorrz;
};

describe("Scorrz", () => {
	test("Should select adjudicator", () => {
		const store = prepareStore();

		const scorrz = mountScorrz(store);

		const adjudicatorSelectionButtons = scorrz.find(
			'div[data-testid="adjudicators-selection"] button',
		);
		adjudicatorSelectionButtons.at(1).simulate("click");

		const actions = store.getActions();
		expect(actions).toContainEqual(toggleAdjudicator(1));
	});

	test("Should select round", () => {
		const store = prepareStore();
		const scorrz = mountScorrz(store);

		const roundsSelectionButtons = scorrz.find(
			'div[data-testid="rounds-selection"] button',
		);
		roundsSelectionButtons.at(1).simulate("click");

		const actions = store.getActions();
		expect(actions).toContainEqual(toggleRound(1));
	});
});
