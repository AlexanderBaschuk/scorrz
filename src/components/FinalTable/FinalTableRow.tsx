import {
	CellDecoration,
	TdStyled,
	TrClickable,
} from "@/components/common/Table.styles";
import { CompetitorId, CompetitorSelectionIndex, Score } from "@/types";
import React, { useCallback } from "react";

import { alignByDecimal } from "@/helpers/alignment";

export interface FinalTableRowProps {
	place: number;
	id: CompetitorId;
	name: string;
	gridSum: Score;
	selectionIndex: CompetitorSelectionIndex;
	clickCompetitorRow?: (id: CompetitorId) => void;
}

export const FinalTableRow: React.FC<FinalTableRowProps> = ({
	place,
	id,
	name,
	gridSum,
	selectionIndex,
	clickCompetitorRow,
}) => {
	const onClick = useCallback(() => {
		clickCompetitorRow?.(id);
	}, [clickCompetitorRow, id]);

	return (
		<TrClickable onClick={onClick}>
			<TdStyled selection={selectionIndex} decoration={CellDecoration.Place}>
				{alignByDecimal(place, 2)}
			</TdStyled>
			<TdStyled selection={selectionIndex} decoration={CellDecoration.None}>
				{id}
			</TdStyled>
			<TdStyled selection={selectionIndex} decoration={CellDecoration.None}>
				{name}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				decoration={CellDecoration.GridScore}
			>
				{alignByDecimal(Math.round(gridSum * 100) / 100, 3)}
			</TdStyled>
		</TrClickable>
	);
};
