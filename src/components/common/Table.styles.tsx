import { CompetitorSelectionIndex } from "@/types";
import styled from "@emotion/styled";

export const SCORE_SUM_BG_COLOR = "#faffa0";
export const GRID_SCORE_BG_COLOR = "#d0feff";
export const SelectionColors = ["yellow", "lime", "silver", "mediumaquamarine", "lightblue"];

export enum CellDecoration {
	None = 0,
	Place,
	ScoreSum,
	GridScore,
}

export interface TrProps {
	selectionIndex: CompetitorSelectionIndex;
}

export interface TdStyledProps {
	selection: CompetitorSelectionIndex;
	decoration: CellDecoration;
}

export const TableWrapperStyled = styled.div`
	padding: 10px 20px 0 0;
	display: inline-block;
	vertical-align: top;
`;

export const TableTitleStyled = styled.div`
	padding: 4px;
	font-size: 1.2em;
	font-weight: bold;
`;

export const ResultsTableStyled = styled.table`
	border: 0 solid;
	border-collapse: collapse;

	th {
		text-align: left;
		padding: 3px 6px 3px 4px;
		border: 0;
		border-bottom: 1px solid;
		border-color: #a0a0a0;
	}

	td {
		border: 0 solid;
		padding: 3px 6px 3px 4px;
	}
`;

export const TrClickable = styled.tr`
	cursor: pointer;
`;

export const TdStyled = styled.td<TdStyledProps>`
	background-color: ${(p) => SelectionColors[p.selection] ?? "none"};
	font-weight: ${(p) =>
		p.decoration === CellDecoration.GridScore ? "bold" : "regular"};
	${(p) => getFontColorStyle(p.decoration)}
`;

const getFontColorStyle = (decoration: CellDecoration) => {
	return decoration === CellDecoration.GridScore
		? "color: #035cff;"
		: undefined;
};
