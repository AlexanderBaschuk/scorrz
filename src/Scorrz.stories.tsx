import {
	AdjudicatorTable,
	CompetitorRow,
} from "./AdjudicatorTable/AdjudicatorTable";
import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";

import React from "react";
import { action } from "@storybook/addon-actions";

export default {
	title: "Results table",
	decorators: [withKnobs],
};

export const AdjudicatorTableStory: React.FC = () => {
	const rowsCount = number("rowsCount", 10);
	const rounds = ["H", "L", "S"];
	const rows = Array.from({length: rowsCount}, (_, i) => ({
		id: (100 + i).toString(),
		name: "Competitor Name",
		scores: [75, 77, 65.5],
		sum: 75 + 77 + 65.5,
		gridScore: 100,
	}));

	return (
		<AdjudicatorTable
			adjudicatorName={text("adjudicatorName", "Adjudicator 1")}
			rounds={rounds}
			results={rows}
		/>
	);
};
