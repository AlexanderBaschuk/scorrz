import { CompetitorId, CompetitorSelectionIndex, Score } from "@/types";
import React, { useCallback } from "react";
import { TdGrid, TdSum } from "./AdjudicatorTable.styles";

interface AdjudicatorTableRowProps {
	id: CompetitorId;
	name: string;
	selectedRounds: boolean[];
	scores: Score[];
	sum: Score;
	gridScore: Score;
	shouldShowSums: boolean;
	shouldShowGrids: boolean;
	selectionIndex: CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
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
	selectionIndex,
	clickCompetitorRow,
}) => {
	const onClick = useCallback(() => {
		clickCompetitorRow?.(id);
	}, [clickCompetitorRow, id]);
	const selectionMark =
		selectionIndex !== null ? "*".repeat(selectionIndex + 1) : "";
	return (
		<tr onClick={onClick}>
			<td>{id}</td>
			<td>{name + selectionMark}</td>
			{scores.map((score, i) => selectedRounds[i] && <td key={i}>{score}</td>)}
			{shouldShowSums && <TdSum>{sum}</TdSum>}
			{shouldShowGrids && <TdGrid>{Math.round(gridScore * 100) / 100}</TdGrid>}
		</tr>
	);
};
