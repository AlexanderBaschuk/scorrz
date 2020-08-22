import { HEAVY, LIGHT, RECALL, SET, TOTAL } from "./testHelpers/StateBuilder";
import { selectRound, selectRoundGroup, toggleCompetitor } from "./actions";

import { Create } from "./testHelpers/dsl";
import { State } from "./types";
import { reducer } from "./reducer";
import { selectedRoundsSelector } from "./selectors";

describe("toggleCompetitor()", () => {
	test.each`
		initialSelection                   | expectedResult
		${[null, null, null, null, null]}  | ${["999", null, null, null, null]}
		${["999", null, null, null, null]} | ${[null, null, null, null, null]}
		${[null, null, "999", null, null]} | ${[null, null, null, null, null]}
		${["1", null, null, null, null]}   | ${["1", "999", null, null, null]}
		${[null, null, "1", null, null]}   | ${["999", null, "1", null, null]}
		${["1", "2", "3", "4", null]}      | ${["1", "2", "3", "4", "999"]}
		${["1", "2", "3", null, "4"]}      | ${["1", "2", "3", "999", "4"]}
		${["1", "2", "3", "4", "5"]}       | ${["1", "2", "3", "4", "5"]}
		${["1", "999", "3", "4", "5"]}     | ${["1", null, "3", "4", "5"]}
	`(
		"Given $initialSelection. When select competitor 999. Should get $expectedResult.",
		({ initialSelection, expectedResult }) => {
			let state: State = Create.state()
				.withSelectedCompetitors(initialSelection)
				.please();

			state = reducer(state, toggleCompetitor("999"));

			expect(state.selectedCompetitors).toEqual(expectedResult);
		},
	);
});

describe.each`
	selectedRound | selectedGroup
	${2}          | ${undefined}
	${undefined}  | ${1}
`(
	"Rounds selection (reducer + selector). Selected round: $selectedRound . Selected group: $selectedGroup",
	({ selectedRound, selectedGroup }) => {
		const prepareState = (): State => Create.state()
		.withRounds([HEAVY, LIGHT, SET])
		.withRoundGroups([RECALL, TOTAL])
		.withSelectedRound(selectedRound)
		.withSelectedRoundGroup(selectedGroup)
		.please();

		test.each`
			round | expectedResult
			${0}  | ${[true, false, false]}
			${1}  | ${[false, true, false]}
			${2}  | ${[false, false, true]}
		`("Selecting round $round.", ({ round, expectedResult }) => {
			let state = prepareState();

			state = reducer(state, selectRound(round));

			expect(state.selectedRound).toBe(round);
			expect(state.selectedRoundGroup).toBe(undefined);

			const selectedRounds = selectedRoundsSelector(state);
			expect(selectedRounds).toEqual(expectedResult);
		});

		test.each`
			group | expectedResult
			${0}  | ${[true, true, false]}
			${1}  | ${[true, true, true]}
		`(
			"Selecting round group $group.",
			({ group, expectedResult }) => {
				let state = prepareState();

				state = reducer(state, selectRoundGroup(group));

				expect(state.selectedRound).toBe(undefined);
				expect(state.selectedRoundGroup).toBe(group);

				const selectedRounds = selectedRoundsSelector(state);
				expect(selectedRounds).toEqual(expectedResult);
			},
		);
	},
);
