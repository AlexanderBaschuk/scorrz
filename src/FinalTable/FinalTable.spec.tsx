import { mount, shallow } from "enzyme";

import { FinalTable } from "./FinalTable";
import { FinalTableRowView } from "@/model/types";
import React from "react";

const getTableRowCells = (table, row: number) =>
	table
		.find("tr")
		.at(row + 1) // First row is table header.
		.find("td")
		.map((td) => td.text());

const competitorResults1: FinalTableRowView = {
	id: "123",
	name: "Sasha",
	gridSum: 180,
	place: 1,
};

const competitorResults2: FinalTableRowView = {
	id: "234",
	name: "Natasha",
	gridSum: 150.5,
	place: 2,
};

describe("AdjudicatorTable", () => {
	test("Displays results of all competitors", () => {
		const table = mount(
			<FinalTable results={[competitorResults1, competitorResults2]} />,
		);

		const competitorRow1 = getTableRowCells(table, 0);
		expect(competitorRow1).toEqual(["1", "123", "Sasha", "180"]);

		const competitorRow2 = getTableRowCells(table, 1);
		expect(competitorRow2).toEqual(["2", "234", "Natasha", "150.5"]);
	});
});
