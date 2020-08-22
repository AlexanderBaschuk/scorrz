import {
	CellDecoration,
	TdStyled,
	TrClickable,
} from "@/components/common/Table.styles";
import { CompetitorId, CompetitorSelectionIndex, Score } from "@/types";
import React, { useCallback } from "react";

import { alignByDecimal } from "@/helpers/alignment";

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
							key={i}
							selection={selectionIndex}
							decoration={CellDecoration.None}
						>
							{alignByDecimal(score, 2)}
						</TdStyled>
					),
			)}
			{shouldShowSums && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.ScoreSum}
				>
					{alignByDecimal(sum, 3)}
				</TdStyled>
			)}
			{shouldShowGrids && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.GridScore}
				>
					{alignByDecimal(Math.round(gridScore * 100) / 100, 3)}
				</TdStyled>
			)}
		</TrClickable>
	);
};
