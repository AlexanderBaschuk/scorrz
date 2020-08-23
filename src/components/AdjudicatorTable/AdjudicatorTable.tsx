import {
	AdjudicatorTableRowView,
	CompetitorId,
	CompetitorSelectionIndex,
	DisplayMode,
} from "@/types";
import React, { useCallback } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";

interface AdjudicatorTableProps {
	adjudicatorName: string;
	displayMode: DisplayMode;
	selectedRounds: boolean[];
	rounds: string[];
	resultRows: AdjudicatorTableRowView[];
	focusedCompetitor?: CompetitorId;
	getCompetitorSelectionIndex?: (id: CompetitorId) => CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
	hoverCompetitorRow?: (CompetitorId) => void;
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	displayMode,
	selectedRounds,
	rounds,
	resultRows,
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
		<TableWrapperStyled data-testid="adjudicator-table">
			<TableTitleStyled>{adjudicatorName}</TableTitleStyled>
			<ResultsTableStyled onMouseLeave={unfocusCompetitor}>
				<thead>
					<AdjudicatorTableHeader
						displayMode={displayMode}
						selectedRounds={selectedRounds}
						rounds={rounds}
					/>
				</thead>
				<tbody>
					{resultRows.map((row) => (
						<AdjudicatorTableRow
							key={row.id}
							id={row.id}
							name={row.name}
							displayMode={displayMode}
							selectedRounds={selectedRounds}
							scores={row.scores}
							sum={row.sum}
							gridScore={row.gridScore}
							selectionIndex={getCompetitorSelectionIndex?.(row.id) ?? null}
							isFocused={isFocused(row.id)}
							clickCompetitorRow={clickCompetitorRow}
							hoverCompetitorRow={hoverCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
