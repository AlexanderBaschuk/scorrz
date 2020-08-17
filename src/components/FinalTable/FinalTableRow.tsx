import { CellDecoration, TdStyled, TrClickable } from "../common/Table.styles";
import { CompetitorId, CompetitorSelectionIndex, Score } from "@/types";
import React, { useCallback } from "react";

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
				{place}
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
				{Math.round(gridSum * 100) / 100}
			</TdStyled>
		</TrClickable>
	);
};
