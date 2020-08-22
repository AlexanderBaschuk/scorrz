import { Create } from "./testHelpers/dsl";
import { State } from "./types";
import { reducer } from "./reducer";
import { toggleCompetitor } from "./actions";

describe("toggleCompetitor", () => {
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
		"toggleCompetitor(). Given $initialSelection. When select competitor 999. Should get $expectedResult.",
		({ initialSelection, expectedResult }) => {
			let state: State = Create.state().withSelectedCompetitors(
				initialSelection,
			);

			state = reducer(state, toggleCompetitor("999")) || state;

			expect(state.selectedCompetitors).toEqual(expectedResult);
		},
	);
});
