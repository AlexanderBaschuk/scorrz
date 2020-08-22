import { HEAVY, LIGHT, SET } from "@/testHelpers/StateBuilder";
import { toggleAdjudicator, toggleCompetitor, toggleRound } from "@/actions";

import { Create } from "@/testHelpers/dsl";
import { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";
import React from "react";
import { Scorrz } from "./Scorrz";
import { State } from "@/types";
import { mount } from "enzyme";
import { reducer } from "@/reducer";

const adjudicator1 = "Brendan O'Brian";
const adjudicator2 = "Mary McElroy";

const getTestState = () =>
	Create.state()
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
		)
		.withSelectedAdjudicators([true, true]);

const prepareStore = (state?: State): MockStore => {
	return Create.store(state ?? getTestState());
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

	test.each`
		selectedAdjudicators | expectedTablesCount
		${[true, true]}      | ${2}
		${[false, true]}     | ${1}
		${[true, false]}     | ${1}
		${[false, false]}    | ${0}
	`(
		"Displaying results of selected adjudicators: $selectedAdjudicators",
		({ selectedAdjudicators, expectedTablesCount }) => {
			const state = getTestState().withSelectedAdjudicators(
				selectedAdjudicators,
			);
			const store = prepareStore(state);

			const scorrz = mountScorrz(store);

			const adjudicatorTables = scorrz.find(
				'div[data-testid="adjudicator-table"]',
			);

			expect(adjudicatorTables.length).toBe(expectedTablesCount);
		},
	);

	test.each`
		selectedAdjudicators | shouldDisplayFinalResults
		${[true, true]}      | ${true}
		${[false, true]}     | ${false}
		${[true, false]}     | ${false}
		${[false, false]}    | ${false}
	`(
		"Displaying of final results for selected adjudicators: $selectedAdjudicators",
		({ selectedAdjudicators, shouldDisplayFinalResults }) => {
			const state = getTestState().withSelectedAdjudicators(
				selectedAdjudicators,
			);
			const store = prepareStore(state);

			const scorrz = mountScorrz(store);

			const finalTables = scorrz.find('div[data-testid="final-table"]');

			expect(finalTables.length).toBe(shouldDisplayFinalResults ? 1 : 0);
		},
	);

	test.each`
		cellIndex
		${0}
		${1}
		${2}
		${3}
		${4}
		${5}
		${6}
	`(
		"Should select competitor in Adjudicator table by clicking on cell $cellIndex",
		({ cellIndex }) => {
			const state = getTestState();
			const store = prepareStore(state);
			const scorrz = mountScorrz(store);

			const adjudicatorTable = scorrz.find(
				'div[data-testid="adjudicator-table"]',
			);
			const tableCells = adjudicatorTable.find("td");
			tableCells.at(cellIndex).simulate("click");

			expect(store.getActions()).toEqual([toggleCompetitor("123")]);
		},
	);

	test.each`
		cellIndex
		${0}
		${1}
		${2}
		${3}
	`(
		"Should select competitor in Final table by clicking on cell $cellIndex",
		({ cellIndex }) => {
			const state = getTestState();
			const store = prepareStore(state);
			const scorrz = mountScorrz(store);

			const adjudicatorTable = scorrz.find('div[data-testid="final-table"]');
			const tableCells = adjudicatorTable.find("td");
			tableCells.at(cellIndex).simulate("click");

			expect(store.getActions()).toEqual([toggleCompetitor("123")]);
		},
	);
});
