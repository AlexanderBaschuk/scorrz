import { CompetitorId, Score } from "@/redux/types";
import { TdGrid, TdSum } from "./AdjudicatorTable.styles";

import React from "react";

interface AdjudicatorTableRowProps {
	id: CompetitorId;
	name: string;
	selectedRounds: boolean[];
	scores: Score[];
	sum: Score;
	gridScore: Score;
	shouldShowSums: boolean;
	shouldShowGrids: boolean;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	id,
	name,
	selectedRounds,
	scores,
	sum,
	gridScore,
	shouldShowSums,
	shouldShowGrids,
}) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			{scores.map((score, i) => selectedRounds[i] && <td key={i}>{score}</td>)}
			{shouldShowSums && <TdSum>{sum}</TdSum>}
			{shouldShowGrids && <TdGrid>{Math.round(gridScore * 100) / 100}</TdGrid>}
		</tr>
	);
};
