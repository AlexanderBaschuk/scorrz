import {
	ColumnType,
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
	school: string;
	gridSum: Score;
	selectionIndex: CompetitorSelectionIndex;
	isFocused: boolean;
	clickCompetitorRow?: (id: CompetitorId) => void;
	hoverCompetitorRow?: (id: CompetitorId) => void;
}

export const FinalTableRow: React.FC<FinalTableRowProps> = ({
	place,
	id,
	name,
	school,
	gridSum,
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
				columnType={ColumnType.Place}
				isFocused={isFocused}
			>
				{alignByDecimal(place, 2)}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				columnType={ColumnType.None}
				isFocused={isFocused}
			>
				{id}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				columnType={ColumnType.None}
				isFocused={isFocused}
			>
				{name}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				columnType={ColumnType.None}
				isFocused={isFocused}
			>
				{school}
			</TdStyled>
			<TdStyled
				selection={selectionIndex}
				columnType={ColumnType.Grid}
				isFocused={isFocused}
			>
				{alignByDecimal(Math.round(gridSum * 100) / 100, 3)}
			</TdStyled>
		</TrClickable>
	);
};
