import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";

import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
	title: "Results table",
	decorators: [withKnobs],
};

export const AdjudicatorTableStory: React.FC = () => {
	return (
		<AdjudicatorTable
			adjudicatorId={number("adjudicatorId", 1)}
			adjudicatorName={text("adjudicatorName", "Adjudicator 1")}
		/>
	);
};
