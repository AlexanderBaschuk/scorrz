import { Create } from "./testHelpers/dsl";
import { executeHookWithStore } from "./testHelpers/executeHook";
import { useResults } from "./useResults";

describe("useResults - general tests", () => {
	test("1 adjudicator, 1 competitor", () => {
		const state = Create.state()
			.withCompetitor({ id: "123", name: "Sasha", school: "Trinity" })
			.withResults(0, Create.adjudicator().withResult("123", [75, 80, 65]));
		const store = Create.store(state);

		const hookResult = executeHookWithStore(() => useResults(), store);

		expect(hookResult.resultsByAdjudicators).toHaveLength(1);
		expect(hookResult.resultsByAdjudicators[0].resultLines).toHaveLength(1);
		expect(hookResult.resultsByAdjudicators[0].resultLines[0]).toEqual({
			id: "123",
			name: "Sasha",
			scores: [75, 80, 65],
			sum: 220,
			gridScore: 100,
		});
	});

	test("1 adjudicator, 3 competitors", () => {
		const state = Create.state()
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
		const store = Create.store(state);

		const hookResult = executeHookWithStore(() => useResults(), store);

		expect(hookResult.resultsByAdjudicators).toHaveLength(1);
		const resultLines = hookResult.resultsByAdjudicators[0].resultLines;
		expect(resultLines).toHaveLength(3);
		expect(resultLines).toEqual([
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

	describe("2 adjudicators, 2 competitors", () => {
		let hookResult;

		beforeAll(() => {
			const state = Create.state()
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
			const store = Create.store(state);

			hookResult = executeHookWithStore(() => useResults(), store);
		});

		test("has results by both adjudicators", () => {
			expect(hookResult.resultsByAdjudicators).toHaveLength(2);
		});

		test("results by adjudicator1", () => {
			const resultLines1 = hookResult.resultsByAdjudicators[0].resultLines;
			expect(resultLines1).toHaveLength(2);
			expect(resultLines1).toEqual([
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
			const resultLines2 = hookResult.resultsByAdjudicators[1].resultLines;
			expect(resultLines2).toHaveLength(2);
			expect(resultLines2).toEqual([
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

		test("has results by both adjudicators", () => {
			expect(hookResult.resultsByAdjudicators).toHaveLength(2);

			const resultLines1 = hookResult.resultsByAdjudicators[0].resultLines;
			expect(resultLines1).toHaveLength(2);
			expect(resultLines1).toEqual([
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

			const resultLines2 = hookResult.resultsByAdjudicators[1].resultLines;
			expect(resultLines1).toHaveLength(2);
			expect(resultLines1).toEqual([
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
	});
});

describe("useResults - specific tests", () => {
	test.todo("Adjudicator names");

	test.todo(
		"Non-existent competitor - calculates successfully with blank info fields",
	);
});
