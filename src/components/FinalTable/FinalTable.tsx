import {
	CompetitorId,
	CompetitorSelectionIndex,
	FinalTableRowView,
} from "@/types";
import React, { useCallback } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";

interface FinalTableProps {
	results: FinalTableRowView[];
	focusedCompetitor?: CompetitorId;
	getCompetitorSelectionIndex?: (id: CompetitorId) => CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
	hoverCompetitorRow?: (CompetitorId) => void;
}

export const FinalTable: React.FC<FinalTableProps> = ({
	results,
	focusedCompetitor,
	getCompetitorSelectionIndex,
	clickCompetitorRow,
	hoverCompetitorRow,
}) => {
	const isFocused = useCallback(
		(id: CompetitorId): boolean => focusedCompetitor === id,
		[focusedCompetitor],
	);

	const unfocusCompetitor = useCallback(() => {
		hoverCompetitorRow(undefined);
	}, [hoverCompetitorRow]);

	return (
		<TableWrapperStyled data-testid="final-table">
			<TableTitleStyled>Total</TableTitleStyled>
			<ResultsTableStyled onMouseLeave={unfocusCompetitor}>
				<thead>
					<FinalTableHeader />
				</thead>
				<tbody>
					{results.map((resultRow) => (
						<FinalTableRow
							key={resultRow.id}
							place={resultRow.place}
							id={resultRow.id}
							name={resultRow.name}
							school={resultRow.school}
							gridSum={resultRow.gridSum}
							selectionIndex={
								getCompetitorSelectionIndex?.(resultRow.id) ?? null
							}
							isFocused={isFocused(resultRow.id)}
							clickCompetitorRow={clickCompetitorRow}
							hoverCompetitorRow={hoverCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
