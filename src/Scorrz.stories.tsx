import { number, object, text, withKnobs } from "@storybook/addon-knobs";

import { AdjudicatorSelection } from "./AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { AdjudicatorTableRowView } from "./model/types";
import { FinalTable } from "./FinalTable/FinalTable";
import { FinalTableRowProps } from "./FinalTable/FinalTableRow";
import React from "react";
import { RoundsSelection } from "./RoundsSelection/RoundsSelection";
import { action } from "@storybook/addon-actions";

export default {
	title: "Results table",
	decorators: [withKnobs],
};

export const AdjudicationSelectionStory: React.FC = () => {
	const adjudicators = ["Mary McElroy", "Brendan O'Brien", "John Cullinane"];
	return (
		<AdjudicatorSelection
			adjudicators={adjudicators}
			selectedAdjudicators={object("selectedAdjudicators", [true, false, true])}
			toggleAdjudicator={action("toggleAdjudicator")}
		/>
	);
};

export const RoundsSelectionStory: React.FC = () => {
	const rounds = ["heavy", "Light", "Set"];
	return (
		<RoundsSelection
			rounds={rounds}
			selectedRounds={object("selectedRounds", [false, true, false])}
			toggleRound={action("toggleRound")}
		/>
	);
};

export const AdjudicatorTableStory: React.FC = () => {
	const rowsCount = number("rowsCount", 10);
	const rounds = ["H", "L", "S"];
	const rows: AdjudicatorTableRowView[] = Array.from(
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
