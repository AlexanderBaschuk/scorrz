import React from "react";
import { Score } from "@/model/types";

export interface AdjudicatorTableRowProps {
	competitorName: string;
	scores: Score[];
	sum: Score;
	gridScore: Score;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	competitorName,
	scores,
	sum,
	gridScore,
}) => {
	return (
		<tr>
			<td>{competitorName}</td>
			{scores.map((score, i) => (
				<td key={i}>{score}</td>
			))}
			<td>{sum}</td>
			<td>{Math.round(gridScore * 100) / 100}</td>
		</tr>
	);
};
