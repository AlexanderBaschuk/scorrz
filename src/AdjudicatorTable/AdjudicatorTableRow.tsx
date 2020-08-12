import { CompetitorId, Score } from "@/model/types";

import React from "react";

export interface AdjudicatorTableRowProps {
	id: CompetitorId;
	name: string;
	scores: Score[];
	sum: Score;
	gridScore: Score;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	name,
	scores,
	sum,
	gridScore,
}) => {
	return (
		<tr>
			<td>{name}</td>
			{scores.map((score, i) => (
				<td key={i}>{score}</td>
			))}
			<td>{sum}</td>
			<td>{Math.round(gridScore * 100) / 100}</td>
		</tr>
	);
};
