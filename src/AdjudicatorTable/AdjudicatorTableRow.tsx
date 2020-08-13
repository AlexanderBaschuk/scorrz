import React from "react";
import { Score } from "@/model/types";

interface AdjudicatorTableRowProps {
	name: string;
	selectedRounds: boolean[];
	scores: Score[];
	sum: Score;
	gridScore: Score;
	shouldShowSums: boolean;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	name,
	selectedRounds,
	scores,
	sum,
	gridScore,
	shouldShowSums,
}) => {
	return (
		<tr>
			<td>{name}</td>
			{scores.map((score, i) => selectedRounds[i] && <td key={i}>{score}</td>)}
			{shouldShowSums && <td>{sum}</td>}
			<td>{Math.round(gridScore * 100) / 100}</td>
		</tr>
	);
};
