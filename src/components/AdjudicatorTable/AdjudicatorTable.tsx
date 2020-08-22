import {
	AdjudicatorTableRowView,
	CompetitorId,
	CompetitorSelectionIndex,
} from "@/types";
import React, { useCallback, useMemo } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";

interface AdjudicatorTableProps {
	adjudicatorName: string;
	selectedRounds: boolean[];
	rounds: string[];
	resultRows: AdjudicatorTableRowView[];
	focusedCompetitor: CompetitorId;
	getCompetitorSelectionIndex?: (id: CompetitorId) => CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
	hoverCompetitorRow?: (CompetitorId) => void;
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	selectedRounds,
	rounds,
	resultRows,
	focusedCompetitor,
	getCompetitorSelectionIndex,
	clickCompetitorRow,
	hoverCompetitorRow,
}) => {
	const shouldShowSums = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 1,
		[selectedRounds],
	);

	const shouldShowGrids = useMemo(
		() => selectedRounds.some((isSelected) => isSelected),
		[selectedRounds],
	);

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
						selectedRounds={selectedRounds}
						rounds={rounds}
						shouldShowSums={shouldShowSums}
						shouldShowGrids={shouldShowGrids}
					/>
				</thead>
				<tbody>
					{resultRows.map((row) => (
						<AdjudicatorTableRow
							key={row.id}
							id={row.id}
							name={row.name}
							selectedRounds={selectedRounds}
							scores={row.scores}
							sum={row.sum}
							gridScore={row.gridScore}
							shouldShowSums={shouldShowSums}
							shouldShowGrids={shouldShowGrids}
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
