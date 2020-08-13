import { HEAVY, LIGHT, SET } from "./testHelpers/StateBuilder";

import { Create } from "./testHelpers/dsl";
import { calculateResultTables } from "./calculateState";

describe("1 adjudicator, 1 competitor", () => {
	const prepareState = () =>
		Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(0, Create.adjudicator().withResult("123", [75, 80, 65]));

	test("returns result for 1 adjudicator", () => {
		const state = prepareState();
		const [adjudicatorTables] = calculateResultTables(state);
		expect(adjudicatorTables).toHaveLength(1);
	});

	test("adjudicator results", () => {
		const state = prepareState();

		const [adjudicatorTables] = calculateResultTables(state);

		expect(adjudicatorTables[0].resultRows).toHaveLength(1);
		expect(adjudicatorTables[0].resultRows[0]).toEqual({
			id: "123",
			name: "Sasha",
			scores: [75, 80, 65],
			sum: 220,
			gridScore: 100,
		});
	});

	test.todo("final results");
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

	test("returns result for 1 adjudicator", () => {
		const state = prepareState();
		const [adjudicatorTables] = calculateResultTables(state);
		expect(adjudicatorTables).toHaveLength(1);
	});

	test("adjudicator results", () => {
		const state = prepareState();

		const [adjudicatorTables] = calculateResultTables(state);

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

	test.todo("final results");
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

	test("has results by both adjudicators", () => {
		const state = prepareState();
		const [adjudicatorTables] = calculateResultTables(state);
		expect(adjudicatorTables).toHaveLength(2);
	});

	test("results by adjudicator1", () => {
		const state = prepareState();

		const [adjudicatorTables] = calculateResultTables(state);
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

	test("results by adjudicator2", () => {
		const state = prepareState();

		const [adjudicatorTables] = calculateResultTables(state);

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

	test.todo("final results");
});

describe("useResults - specific tests", () => {
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

		const [adjudicatorTables] = calculateResultTables(state);

		expect(adjudicatorTables).toHaveLength(2);
		expect(adjudicatorTables[0].adjudicatorName).toBe("Brian");
		expect(adjudicatorTables[1].adjudicatorName).toBe("Mary");
	});

	test("Non-existent competitor - calculates successfully with blank info fields", () => {
		const state = Create.state()
			.withRounds([HEAVY, LIGHT, SET])
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(
				0,
				Create.adjudicator()
					.withResult("234", [60, 70, 50])
					.withResult("123", [70, 80, 60]),
			);

		const [adjudicatorTables] = calculateResultTables(state);
		const resultRows = adjudicatorTables[0].resultRows;
		expect(resultRows[0].name).toEqual("Sasha");
		expect(resultRows[1].name).toEqual("");
	});
});

test.todo("AdjudicatorTables when not all adjudicators selected");
test.todo("Final results when not all adjudicators selected");
test.todo("Final results when only 1 adjudicator selected");
test.todo("Final results when no adjudicators selected");
