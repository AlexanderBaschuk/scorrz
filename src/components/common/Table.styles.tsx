import { CompetitorSelectionIndex } from "@/types";
import styled from "@emotion/styled";

enum CellFontColor {
	ScoreSum = "#00a524",
	GridScore = "#035cff",
	InactiveScore = "#d0d0d0",
}

export const SelectionColors = [
	"#f6fd78",
	"#bafeff",
	"#ffe18d",
	"#a2f3a2",
	"#fbcaf9",
];

export const FOCUS_COLOR = "#f0f0f0";

export enum ColumnType {
	None = 0,
	Place,
	Id,
	Name,
	Score,
	Sum,
	Grid,
}

export interface TrProps {
	selectionIndex: CompetitorSelectionIndex;
}

export interface TdStyledProps {
	selection: CompetitorSelectionIndex;
	columnType: ColumnType;
	isFocused?: boolean;
	isActive?: boolean;
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
	min-width: ${(p) => getMinWidth(p.columnType)};
	background-color: ${(p) => getBackgroundColor(p.selection, p.isFocused)};
	${(p) => getFontWeightStyle(p.columnType)}
	${(p) => getFontColorStyle(p.columnType, p.isActive)}
`;

const getBackgroundColor = (
	selection: CompetitorSelectionIndex,
	isFocused?: boolean,
): string => {
	// TODO. Also change color of selected cells when focused;
	if (SelectionColors[selection]) return SelectionColors[selection];
	return isFocused ? FOCUS_COLOR : "none";
};

const getFontColorStyle = (columnType: ColumnType, isActive: boolean) => {
	if (isActive === false) return `color: ${CellFontColor.InactiveScore};`;
	switch (columnType) {
		case ColumnType.Sum:
			return `color: ${CellFontColor.ScoreSum};`;
		case ColumnType.Grid:
			return `color: ${CellFontColor.GridScore};`;
		default:
			return undefined;
	}
};

const getFontWeightStyle = (columnType: ColumnType) => {
	return columnType === ColumnType.Place ||
		columnType === ColumnType.Grid ||
		columnType === ColumnType.Sum
		? "font-weight: bold;"
		: undefined;
};

const getMinWidth = (columnType: ColumnType) => {
	switch (columnType) {
		case ColumnType.Place:
			return "2ch";
		case ColumnType.Id:
			return "3ch";
		case ColumnType.Score:
			return "4.5ch";
		case ColumnType.Sum:
		case ColumnType.Grid:
			return "5.5ch";
		default:
			return 0;
	}
};
