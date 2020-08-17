import { CellDecoration, TdStyled, TrClickable } from "../common/Table.styles";
import { CompetitorId, CompetitorSelectionIndex, Score } from "@/types";
import React, { useCallback } from "react";

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
	clickCompetitorRow?: (id: CompetitorId) => void;
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
	return (
		<TrClickable onClick={onClick}>
			<TdStyled selection={selectionIndex} decoration={CellDecoration.None}>
				{id}
			</TdStyled>
			<TdStyled selection={selectionIndex} decoration={CellDecoration.None}>
				{name}
			</TdStyled>
			{scores.map(
				(score, i) =>
					selectedRounds[i] && (
						<TdStyled
							selection={selectionIndex}
							decoration={CellDecoration.None}
							key={i}
						>
							{score}
						</TdStyled>
					),
			)}
			{shouldShowSums && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.ScoreSum}
				>
					{sum}
				</TdStyled>
			)}
			{shouldShowGrids && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.GridScore}
				>
					{Math.round(gridScore * 100) / 100}
				</TdStyled>
			)}
		</TrClickable>
	);
};
