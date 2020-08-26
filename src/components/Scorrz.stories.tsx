import {
	AdjudicatorTableRowView,
	CompetitorId,
	DisplayMode,
	FinalTableRowView,
} from "@/types";
import { number, object, text, withKnobs } from "@storybook/addon-knobs";

import { AdjudicatorSelection } from "@/components/AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTable } from "@/components/AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "@/components/FinalTable/FinalTable";
import React from "react";
import { RoundsSelection } from "@/components/RoundsSelection/RoundsSelection";
import { ScorrzStyled } from "./Scorrz.styles";
import { action } from "@storybook/addon-actions";

export default {
	title: "Results table",
	decorators: [withKnobs],
};

const getCompetitorSelectionIndex = (id: CompetitorId) => {
	switch (id) {
		case "100":
			return 0;
		case "102":
			return 1;
		case "103":
			return 2;
		case "105":
			return 3;
		case "106":
			return 4;
		default:
			return null;
	}
};

export const AdjudicationSelectionStory: React.FC = () => {
	const adjudicators = ["Mary McElroy", "Brendan O'Brien", "John Cullinane"];
	return (
		<ScorrzStyled>
			<AdjudicatorSelection
				adjudicators={adjudicators}
				selectedAdjudicators={object("selectedAdjudicators", [
					true,
					false,
					true,
				])}
				toggleAdjudicator={action("toggleAdjudicator")}
			/>
		</ScorrzStyled>
	);
};

export const RoundsSelectionStory: React.FC = () => {
	const rounds = ["heavy", "Light", "Set"];
	return (
		<ScorrzStyled>
			<RoundsSelection
				title="Rounds: "
				isCumulative={false}
				rounds={rounds}
				selectedRound={number("selectedRound", 1)}
				selectRound={action("selectRound")}
			/>
		</ScorrzStyled>
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
		<ScorrzStyled>
			<AdjudicatorTable
				adjudicatorName={text("adjudicatorName", "Adjudicator 1")}
				displayMode={DisplayMode.Championship}
				selectedRounds={object("selectedRounds", [true, false, true])}
				rounds={rounds}
				resultRows={rows}
				getCompetitorSelectionIndex={getCompetitorSelectionIndex}
				focusedCompetitor={"109"}
				clickCompetitorRow={action("clickCompetitorRow")}
				hoverCompetitorRow={action("hoverCompetitorRow")}
			/>
		</ScorrzStyled>
	);
};

export const FinalTableStory: React.FC = () => {
	const rowsCount = number("rowsCount", 10);
	const rows: FinalTableRowView[] = Array.from(
		{ length: rowsCount },
		(_, i) => ({
			place: i,
			id: (100 + i).toString(),
			name: "Competitor Name",
			school: "Irish Dance School",
			gridSum: 100 - i,
		}),
	);

	return (
		<ScorrzStyled>
			<FinalTable
				results={rows}
				getCompetitorSelectionIndex={getCompetitorSelectionIndex}
				focusedCompetitor={"109"}
				clickCompetitorRow={action("clickCompetitorRow")}
				hoverCompetitorRow={action("hoverCompetitorRow")}
			/>
		</ScorrzStyled>
	);
};
