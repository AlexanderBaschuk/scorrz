import { selectRounds, toggleCompetitor } from "./actions";

import { Create } from "./testHelpers/dsl";
import { State } from "./types";
import { reducer } from "./reducer";

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

describe("selectRounds()", () => {
	test.each`
		initialSelection        | rounds       | expectedResult
		${[true, false, true]}  | ${[]}        | ${[false, false, false]}
		${[false, false, true]} | ${[0, 1]}    | ${[true, true, false]}
		${[false, true, false]} | ${[0, 1, 2]} | ${[true, true, true]}
	`(
		"Given $initialSelection. When select rounds $rounds. Should get $expectedResult.",
		({ initialSelection, rounds, expectedResult }) => {
			let state: State = Create.state()
				.withSelectedRounds(initialSelection)
				.please();

			state = reducer(state, selectRounds(rounds));

			expect(state.selectedRounds).toEqual(expectedResult);
		},
	);
});
