import React from "react";
import { Score } from "@/model/types";

interface AdjudicatorTableRowProps {
	name: string;
	rounds: string[];
	scores: Score[];
	sum: Score;
	gridScore: Score;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	name,
	rounds,
	scores,
	sum,
	gridScore,
}) => {
	return (
		<tr>
			<td>{name}</td>
			{scores.map((score, i) => (
				<td key={rounds[i]}>{score}</td>
			))}
			<td>{sum}</td>
			<td>{Math.round(gridScore * 100) / 100}</td>
		</tr>
	);
};
