import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";

import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { AdjudicatorTableRowProps } from "./AdjudicatorTable/AdjudicatorTableRow";
import { FinalTable } from "./FinalTable/FinalTable";
import { FinalTableRowProps } from "./FinalTable/FinalTableRow";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
	title: "Results table",
	decorators: [withKnobs],
};

export const AdjudicatorTableStory: React.FC = () => {
	const rowsCount = number("rowsCount", 10);
	const rounds = ["H", "L", "S"];
	const rows: AdjudicatorTableRowProps[] = Array.from(
		{ length: rowsCount },
		(_, i) => ({
			id: (100 + i).toString(),
			name: "Competitor Name",
			scores: [75 - i / 2, 77 - i, 65 - 2 * i],
			sum: 99.55 - i,
			gridScore: 100 - i,
		}),
	);

	return (
		<AdjudicatorTable
			adjudicatorName={text("adjudicatorName", "Adjudicator 1")}
			rounds={rounds}
			resultRows={rows}
		/>
	);
};

export const FinalTableStory: React.FC = () => {
	const rowsCount = number("rowsCount", 10);
	const rows: FinalTableRowProps[] = Array.from(
		{ length: rowsCount },
		(_, i) => ({
			place: i,
			id: (100 + i).toString(),
			name: "Competitor Name",
			gridSum: 100 - i,
		}),
	);

	return <FinalTable results={rows} />;
};
