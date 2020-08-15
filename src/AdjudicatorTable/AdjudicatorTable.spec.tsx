import { AdjudicatorTable } from "./AdjudicatorTable";
import { AdjudicatorTableRowView } from "@/model/types";
import React from "react";
import { mount } from "enzyme";

const getTableHeaderCells = (table) =>
	table
		.find("tr")
		.at(0)
		.find("th")
		.map((th) => th.text());

const getTableRowCells = (table, row: number) =>
	table
		.find("tr")
		.at(row + 1) // First row is table header.
		.find("td")
		.map((td) => td.text());

const rounds = ["H", "L", "S"];

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
	test.each`
		description                  | selectedRounds
		${"All rounds selected"}     | ${[true, true, true]}
		${"Not all rounds selected"} | ${[false, true, false]}
		${"No rounds selected"}      | ${[false, false, false]}
	`("Displays results of all competitors", ({ selectedRounds }) => {
		const table = mount(
			<AdjudicatorTable
				adjudicatorName=""
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
		description                                                       | selectedRounds           | expectedHeaderCells                             | expectedCells
		${"All rounds selected - displays all results"}                   | ${[true, true, true]}    | ${["Competitor", "H", "L", "S", "Sum", "Grid"]} | ${["123", "Sasha", "50", "60", "70", "180", "75"]}
		${"Not all rounds selected - hides results of unselected rounds"} | ${[true, false, true]}   | ${["Competitor", "H", "S", "Sum", "Grid"]}      | ${["123", "Sasha", "50", "70", "180", "75"]}
		${"One round selected - shows that round, doesn't show Sum"}      | ${[false, true, false]}  | ${["Competitor", "L", "Grid"]}                  | ${["123", "Sasha", "60", "75"]}
		${"No rounds selected - shows only competitor info"}              | ${[false, false, false]} | ${["Competitor"]}                               | ${["123", "Sasha"]}
	`(
		"$description",
		({ selectedRounds, expectedHeaderCells, expectedCells }) => {
			const table = mount(
				<AdjudicatorTable
					adjudicatorName=""
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
});
