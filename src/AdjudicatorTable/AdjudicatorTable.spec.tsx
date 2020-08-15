import { AdjudicatorTable } from "./AdjudicatorTable";
import { AdjudicatorTableRowView } from "@/model/types";
import React from "react";
import { mount } from "enzyme";

const getTableCell = (table, row: number, col: number) => {
	const result = table
		.find("tr")
		.at(row + 1) // First row is table header.
		.find("td")
		.at(col);
	return result;
};

describe("AdjudicatorTable", () => {
	test.each`
		description                  | selectedRounds
		${"All rounds selected"}     | ${[true, true, true]}
		${"Not all rounds selected"} | ${[false, true, false]}
		${"No rounds selected"}      | ${[false, false, false]}
	`("Displays results of all competitors", ({selectedRounds}) => {
		const resultRows: AdjudicatorTableRowView[] = [
			{
				id: "123",
				name: "Sasha",
				scores: [50, 60, 70],
				sum: 180,
				gridScore: 75,
			},
			{
				id: "234",
				name: "Natasha",
				scores: [60, 60.5, 61.5],
				sum: 182,
				gridScore: 100,
			},
		];
		const table = mount(
			<AdjudicatorTable
				adjudicatorName=""
				rounds={["H", "L", "S"]}
				selectedRounds={selectedRounds}
				resultRows={resultRows}
			/>,
		);

		const tableCellCompetitor1 = getTableCell(table, 0, 0);
		expect(tableCellCompetitor1?.text()).toBe("123");

		const tableCellCompetitor2 = getTableCell(table, 1, 0);
		expect(tableCellCompetitor2?.text()).toBe("234");
	});
});
