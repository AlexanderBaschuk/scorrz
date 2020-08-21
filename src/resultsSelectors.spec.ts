import { HEAVY, LIGHT, SET } from "@/testHelpers/StateBuilder";
import {
	adjudicatorTablesSelector,
	finalTableSelector,
} from "@/resultsSelectors";

import { Create } from "@/testHelpers/dsl";

describe("1 adjudicator, 1 competitor", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(0, Create.adjudicator().withResult("123", [75, 80, 65]));

	test("Returns result for 1 adjudicator", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(1);
	});

	test("Adjudicator results", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[0].resultRows).toHaveLength(1);
		expect(adjudicatorTables[0].resultRows[0]).toEqual({
			id: "123",
			name: "Sasha",
			scores: [75, 80, 65],
			sum: 220,
			gridScore: 100,
		});
	});

	test("Final results should be empty", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable).toBeNull();
	});
});

describe("1 adjudicator, 3 competitors", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withCompetitor({ id: "345", name: "Boris", school: "Ceim Oir" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [65, 70, 55])
					.withResult("345", [85, 90, 75])
					.withResult("123", [75, 80, 65]),
			);

	test("Returns result for 1 adjudicator", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(1);
	});

	test("Adjudicator results", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[0].resultRows;
		expect(resultRows).toHaveLength(3);
		expect(resultRows).toEqual([
			{
				id: "345",
				name: "Boris",
				scores: [85, 90, 75],
				sum: 250,
				gridScore: 100,
			},
			{
				id: "123",
				name: "Sasha",
				scores: [75, 80, 65],
				sum: 220,
				gridScore: 75,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [65, 70, 55],
				sum: 190,
				gridScore: 65,
			},
		]);
	});

	test("Final results should be empty", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable).toBeNull();
	});
});

describe("2 adjudicators, 2 competitors", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 50, 60]),
			)
			.withResults(
				1,
				Create.adjudicator()
					.withResult("123", [50, 60, 70])
					.withResult("234", [60, 60, 60.5]),
			);

	test("Has results by both adjudicators", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(2);
	});

	test("Results by adjudicator1", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);
		const resultRows1 = adjudicatorTables[0].resultRows;

		expect(resultRows1).toHaveLength(2);
		expect(resultRows1).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [70, 50, 60],
				sum: 180,
				gridScore: 87.5,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [60, 70, 50],
				sum: 180,
				gridScore: 87.5,
			},
		]);
	});

	test("Results by adjudicator2", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows2 = adjudicatorTables[1].resultRows;
		expect(resultRows2).toHaveLength(2);
		expect(resultRows2).toEqual([
			{
				id: "234",
				name: "Natasha",
				scores: [60, 60, 60.5],
				sum: 180.5,
				gridScore: 100,
			},
			{
				id: "123",
				name: "Sasha",
				scores: [50, 60, 70],
				sum: 180,
				gridScore: 75,
			},
		]);
	});

	test("Final results", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable.results).toHaveLength(2);
		expect(finalTable.results).toEqual([
			{
				id: "234",
				name: "Natasha",
				gridSum: 87.5 + 100,
				place: 1,
			},
			{
				id: "123",
				name: "Sasha",
				gridSum: 87.5 + 75,
				place: 2,
			},
		]);
	});
});

test("Adjudicator names", () => {
	const state = Create.state()
		.withRounds([HEAVY, LIGHT, SET])
		.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
		.withResults(
			0,
			Create.adjudicator().withName("Brian").withResult("123", [60, 70, 50]),
		)
		.withResults(
			1,
			Create.adjudicator().withName("Mary").withResult("123", [50, 60, 70]),
		);

	const adjudicatorTables = adjudicatorTablesSelector(state);

	expect(adjudicatorTables).toHaveLength(2);
	expect(adjudicatorTables[0].adjudicatorName).toBe("Brian");
	expect(adjudicatorTables[1].adjudicatorName).toBe("Mary");
});

test("Non-existent competitor - calculates successfully with empty info fields", () => {
	const state = Create.state()
		.withRounds([HEAVY, LIGHT, SET])
		.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
		.withResults(
			0,
			Create.adjudicator()
				.withResult("234", [60, 70, 50])
				.withResult("123", [70, 80, 60]),
		);

	const adjudicatorTables = adjudicatorTablesSelector(state);
	const resultRows = adjudicatorTables[0].resultRows;
	expect(resultRows[0].name).toEqual("Sasha");
	expect(resultRows[1].name).toEqual("");
});

describe("Only 1 adjudicator selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(0, Create.adjudicator().withResult("123", [70, 50, 60]))
			.withResults(1, Create.adjudicator().withResult("123", [50, 60, 70]))
			.withResults(2, Create.adjudicator().withResult("123", [60, 70, 50]))
			.withSelectedAdjudicators([false, true, false]);

	test("Should return initial count of tables", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables).toHaveLength(3);
		expect(adjudicatorTables[0]).toBeNull();
		expect(adjudicatorTables[1]).not.toBeNull();
		expect(adjudicatorTables[2]).toBeNull();
	});

	test("Results of selected adjudicator", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[1].resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [50, 60, 70],
				sum: 180,
				gridScore: 100,
			},
		]);
	});

	test("Final results should be empty", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable).toBeNull();
	});
});

describe("2 of 3 adjudicators selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 50, 60]),
			)
			.withResults(
				1,
				Create.adjudicator()
					.withResult("123", [50, 60, 70])
					.withResult("234", [60, 60, 60.5]),
			)
			.withResults(
				2,
				Create.adjudicator()
					.withResult("123", [60, 60, 60.5])
					.withResult("234", [50, 60, 70]),
			)
			.withSelectedAdjudicators([true, false, true]);

	test("Should return initial count of tables", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables).toHaveLength(3);
		expect(adjudicatorTables[0]).not.toBeNull();
		expect(adjudicatorTables[1]).toBeNull();
		expect(adjudicatorTables[2]).not.toBeNull();
	});

	test("Results of adjudicator 1", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[0].resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [70, 50, 60],
				sum: 180,
				gridScore: 87.5,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [60, 70, 50],
				sum: 180,
				gridScore: 87.5,
			},
		]);
	});

	test("Results of adjudicator 3", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[2].resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [60, 60, 60.5],
				sum: 180.5,
				gridScore: 100,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [50, 60, 70],
				sum: 180,
				gridScore: 75,
			},
		]);
	});

	test("Final results", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable.results).toEqual([
			{
				id: "123",
				name: "Sasha",
				gridSum: 87.5 + 100,
				place: 1,
			},
			{
				id: "234",
				name: "Natasha",
				gridSum: 87.5 + 75,
				place: 2,
			},
		]);
	});
});

describe("No adjudicators selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(0, Create.adjudicator().withResult("123", [70, 50, 60]))
			.withResults(1, Create.adjudicator().withResult("123", [50, 60, 70]))
			.withSelectedAdjudicators([false, false]);

	test("Should return initial count of empty tables", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables).toHaveLength(2);
		expect(adjudicatorTables[0]).toBeNull();
		expect(adjudicatorTables[1]).toBeNull();
	});

	test("Final results should be empty", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable).toBeNull();
	});
});

describe("Only 1 round selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 50, 60]),
			)
			.withResults(
				1,
				Create.adjudicator()
					.withResult("123", [50, 60, 70])
					.withResult("234", [60, 60, 60.5]),
			)
			.withSelectedRounds([false, true, false]);

	test("Has results by both adjudicators", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(2);
		expect(adjudicatorTables[0]).not.toBeNull();
		expect(adjudicatorTables[1]).not.toBeNull();
	});

	test("Has only selected round in adjudicator results", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[0].rounds).toEqual([null, "L", null]);
	});

	test("Results by adjudicator1", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[0].resultRows;
		expect(resultRows).toEqual([
			{
				id: "234",
				name: "Natasha",
				scores: [null, 70, null],
				sum: 70,
				gridScore: 100,
			},
			{
				id: "123",
				name: "Sasha",
				scores: [null, 50, null],
				sum: 50,
				gridScore: 75,
			},
		]);
	});

	test("Results by adjudicator2", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[1].resultRows;
		expect(resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [null, 60, null],
				sum: 60,
				gridScore: 87.5,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [null, 60, null],
				sum: 60,
				gridScore: 87.5,
			},
		]);
	});

	test("Final results", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable.results).toEqual([
			{
				id: "234",
				name: "Natasha",
				gridSum: 100 + 87.5,
				place: 1,
			},
			{
				id: "123",
				name: "Sasha",
				gridSum: 75 + 87.5,
				place: 2,
			},
		]);
	});
});

describe("2 of 3 rounds selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 50, 60]),
			)
			.withResults(
				1,
				Create.adjudicator()
					.withResult("123", [50, 60, 70])
					.withResult("234", [60, 60, 60.5]),
			)
			.withSelectedRounds([true, false, true]);

	test("Has results by both adjudicators", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(2);
		expect(adjudicatorTables[0]).not.toBeNull();
		expect(adjudicatorTables[1]).not.toBeNull();
	});

	test("Has only selected rounds in adjudicator results", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[0].rounds).toEqual(["H", null, "S"]);
	});

	test("Results by adjudicator1", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[0].resultRows;
		expect(resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [70, null, 60],
				sum: 130,
				gridScore: 100,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [60, null, 50],
				sum: 110,
				gridScore: 75,
			},
		]);
	});

	test("Results by adjudicator2", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[1].resultRows;
		expect(resultRows).toEqual([
			{
				id: "234",
				name: "Natasha",
				scores: [60, null, 60.5],
				sum: 120.5,
				gridScore: 100,
			},
			{
				id: "123",
				name: "Sasha",
				scores: [50, null, 70],
				sum: 120,
				gridScore: 75,
			},
		]);
	});

	test("Final results", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable.results).toEqual([
			{
				id: "123",
				name: "Sasha",
				gridSum: 87.5 + 87.5,
				place: 1,
			},
			{
				id: "234",
				name: "Natasha",
				gridSum: 87.5 + 87.5,
				place: 1,
			},
		]);
	});
});

describe("No rounds selected", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withCompetitor({ id: "234", name: "Natasha", school: "Avalon" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 50, 60]),
			)
			.withResults(
				1,
				Create.adjudicator()
					.withResult("123", [50, 60, 70])
					.withResult("234", [60, 60, 60.5]),
			)
			.withSelectedRounds([false, false, false]);

	test("Has results by both adjudicators", () => {
		const state = prepareState();
		const adjudicatorTables = adjudicatorTablesSelector(state);
		expect(adjudicatorTables).toHaveLength(2);
		expect(adjudicatorTables[0]).not.toBeNull();
		expect(adjudicatorTables[1]).not.toBeNull();
	});

	test("Has no rounds in adjudicator results", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		expect(adjudicatorTables[0].rounds).toEqual([null, null, null]);
		expect(adjudicatorTables[1].rounds).toEqual([null, null, null]);
	});

	test("Results by adjudicator1", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[0].resultRows;
		expect(resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [null, null, null],
				sum: 0,
				gridScore: 87.5,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [null, null, null],
				sum: 0,
				gridScore: 87.5,
			},
		]);
	});

	test("Results by adjudicator2", () => {
		const state = prepareState();

		const adjudicatorTables = adjudicatorTablesSelector(state);

		const resultRows = adjudicatorTables[1].resultRows;
		expect(resultRows).toEqual([
			{
				id: "123",
				name: "Sasha",
				scores: [null, null, null],
				sum: 0,
				gridScore: 87.5,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [null, null, null],
				sum: 0,
				gridScore: 87.5,
			},
		]);
	});

	test("Final results should be null", () => {
		const state = prepareState();
		const finalTable = finalTableSelector(state);
		expect(finalTable).toBeNull();
	});
});
