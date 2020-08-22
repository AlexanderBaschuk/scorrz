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
	isFocused: boolean;
	clickCompetitorRow?: (id: CompetitorId) => void;
	hoverCompetitorRow?: (id: CompetitorId) => void;
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
	isFocused,
	clickCompetitorRow,
	hoverCompetitorRow,
}) => {
	const onClick = useCallback(() => {
		clickCompetitorRow?.(id);
	}, [clickCompetitorRow, id]);

	const onMouseEnter = useCallback(() => {
		hoverCompetitorRow?.(id);
	}, [hoverCompetitorRow, id]);

	return (
		<TrClickable onClick={onClick} onMouseEnter={onMouseEnter}>
			<TdStyled
				selection={selectionIndex}
				decoration={CellDecoration.None}
				isFocused={isFocused}
			>
				{id}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				decoration={CellDecoration.None}
				isFocused={isFocused}
			>
				{name}
			</TdStyled>
			{scores.map(
				(score, i) =>
					selectedRounds[i] && (
						<TdStyled
							key={i}
							selection={selectionIndex}
							decoration={CellDecoration.None}
							isFocused={isFocused}
						>
							{alignByDecimal(score, 2)}
						</TdStyled>
					),
			)}
			{shouldShowSums && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.ScoreSum}
					isFocused={isFocused}
				>
					{alignByDecimal(sum, 3)}
				</TdStyled>
			)}
			{shouldShowGrids && (
				<TdStyled
					selection={selectionIndex}
					decoration={CellDecoration.GridScore}
					isFocused={isFocused}
				>
					{alignByDecimal(Math.round(gridScore * 100) / 100, 3)}
				</TdStyled>
			)}
		</TrClickable>
	);
};
