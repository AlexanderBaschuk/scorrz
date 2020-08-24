import { AdjudicatorTableRowView, DisplayMode } from "@/types";

import { AdjudicatorTable } from "./AdjudicatorTable";
import React from "react";
import { mount } from "enzyme";

const getTableHeaderCells = (table) =>
	table
		.find("tr")
		.at(0)
		.find("th")
		.map((th) => th.text().trim());

const getTableRowCells = (table, row: number) =>
	table
		.find("tr")
		.at(row + 1) // First row is table header.
		.find("td")
		.map((td) => td.text().trim());

const rounds = ["H", "L", "S"];
const adjudicatorName = "Brendan O'Brien";

const competitorResults1: AdjudicatorTableRowView = {
	id: "123",
	name: "Sasha",
	scores: [50, 60, 70],
	sum: 180,
	gridScore: 75,
};

const competitorResults2: AdjudicatorTableRowView = {
	id: "234",
	name: "Natasha",
	scores: [60, 60.5, 61.5],
	sum: 182,
	gridScore: 100,
};

describe("AdjudicatorTable", () => {
	test("Displays adjudicator name", () => {
		const table = mount(
			<AdjudicatorTable
				adjudicatorName={adjudicatorName}
				displayMode={DisplayMode.Championship}
				rounds={rounds}
				selectedRounds={[true, false, true]}
				resultRows={[competitorResults1, competitorResults2]}
			/>,
		);

		expect(table.text()).toContain(adjudicatorName);
	});

	test.each`
		description                  | selectedRounds
		${"All rounds selected"}     | ${[true, true, true]}
		${"Not all rounds selected"} | ${[false, true, false]}
		${"No rounds selected"}      | ${[false, false, false]}
	`("Displays results of all competitors", ({ selectedRounds }) => {
		const table = mount(
			<AdjudicatorTable
				adjudicatorName={adjudicatorName}
				displayMode={DisplayMode.Championship}
				rounds={rounds}
				selectedRounds={selectedRounds}
				resultRows={[competitorResults1, competitorResults2]}
			/>,
		);

		const competitorRow1 = getTableRowCells(table, 0);
		expect(competitorRow1[0]).toBe("123");

		const competitorRow2 = getTableRowCells(table, 1);
		expect(competitorRow2[0]).toBe("234");
	});

	test.each`
		description           | selectedRounds          | expectedHeaderCells    | expectedCells
		${"Round 1 selected"} | ${[true, false, false]} | ${["Competitor", "H"]} | ${["123", "Sasha", "50"]}
		${"Round 2 selected"} | ${[false, true, false]} | ${["Competitor", "L"]} | ${["123", "Sasha", "60"]}
		${"Round 3 selected"} | ${[false, false, true]} | ${["Competitor", "S"]} | ${["123", "Sasha", "70"]}
	`(
		"Single rounds mode. $description",
		({ selectedRounds, expectedHeaderCells, expectedCells }) => {
			const table = mount(
				<AdjudicatorTable
					adjudicatorName={adjudicatorName}
					displayMode={DisplayMode.SingleRounds}
					rounds={rounds}
					selectedRounds={selectedRounds}
					resultRows={[competitorResults1]}
				/>,
			);

			const tableHeaderCells = getTableHeaderCells(table);
			expect(tableHeaderCells).toEqual(expectedHeaderCells);

			const tableRowCells = getTableRowCells(table, 0);
			expect(tableRowCells).toEqual(expectedCells);
		},
	);

	test.each`
		description                  | selectedRounds
		${"All rounds selected"}     | ${[true, true, true]}
		${"Not all rounds selected"} | ${[true, true, false]}
		${"One round selected"}      | ${[true, false, false]}
	`("Championship mode. $description", ({ selectedRounds }) => {
		const table = mount(
			<AdjudicatorTable
				adjudicatorName={adjudicatorName}
				displayMode={DisplayMode.Championship}
				rounds={rounds}
				selectedRounds={selectedRounds}
				resultRows={[competitorResults1]}
			/>,
		);

		const tableHeaderCells = getTableHeaderCells(table);
		expect(tableHeaderCells).toEqual([
			"Competitor",
			"H",
			"L",
			"S",
			"Sum",
			"Grid",
		]);

		const tableRowCells = getTableRowCells(table, 0);
		expect(tableRowCells).toEqual([
			"123",
			"Sasha",
			"50",
			"60",
			"70",
			"180",
			"75",
		]);
	});
});
