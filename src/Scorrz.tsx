import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import React from "react";

export const Scorrz: React.FC = () => {
	const results = [
		{
			id: "101",
			name: "Competitor Name",
			scores: [75, 77, 65.5],
			sum: 75 + 77 + 65.5,
			gridScore: 100,
		},
		{
			id: "105",
			name: "Competitor Name",
			scores: [65.5, 75, 70],
			sum: 65.5 + 75 + 70,
			gridScore: 75,
		}
	]
	return (
		<AdjudicatorTable
			adjudicatorName="adjudicator 1"
			rounds={["H", "L", "S"]}
			results={results}
		/>
	);
};
