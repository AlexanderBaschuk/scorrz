import {
	ColumnType,
	TdStyled,
	TrClickable,
} from "@/components/common/Table.styles";
import {
	CompetitorId,
	CompetitorSelectionIndex,
	DisplayMode,
	Score,
} from "@/types";
import React, { useCallback } from "react";

import { alignByDecimal } from "@/helpers/alignment";

interface AdjudicatorTableRowProps {
	id: CompetitorId;
	name: string;
	displayMode: DisplayMode;
	selectedRounds: boolean[];
	scores: Score[];
	sum: Score;
	gridScore: Score;
	selectionIndex: CompetitorSelectionIndex;
	isFocused: boolean;
	clickCompetitorRow?: (id: CompetitorId) => void;
	hoverCompetitorRow?: (id: CompetitorId) => void;
}

export const AdjudicatorTableRow: React.FC<AdjudicatorTableRowProps> = ({
	id,
	name,
	displayMode,
	selectedRounds,
	scores,
	sum,
	gridScore,
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
				columnType={ColumnType.Id}
				isFocused={isFocused}
			>
				{id}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				columnType={ColumnType.Name}
				isFocused={isFocused}
			>
				{name}
			</TdStyled>
			{scores.map(
				(score, i) =>
					(displayMode === DisplayMode.Championship || selectedRounds[i]) && (
						<TdStyled
							key={i}
							selection={selectionIndex}
							columnType={ColumnType.Score}
							isFocused={isFocused}
							isActive={selectedRounds[i] === true}
						>
							{alignByDecimal(score, 2)}
						</TdStyled>
					),
			)}
			{displayMode === DisplayMode.Championship && (
				<TdStyled
					selection={selectionIndex}
					columnType={ColumnType.Sum}
					isFocused={isFocused}
				>
					{alignByDecimal(sum, 3)}
				</TdStyled>
			)}
			{displayMode === DisplayMode.Championship && (
				<TdStyled
					selection={selectionIndex}
					columnType={ColumnType.Grid}
					isFocused={isFocused}
				>
					{alignByDecimal(Math.round(gridScore * 100) / 100, 3)}
				</TdStyled>
			)}
		</TrClickable>
	);
};
