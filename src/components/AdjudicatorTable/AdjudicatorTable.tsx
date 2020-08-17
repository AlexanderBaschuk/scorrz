import {
	AdjudicatorTableRowView,
	CompetitorId,
	CompetitorSelectionIndex,
} from "@/types";
import React, { useMemo } from "react";
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
	getCompetitorSelectionIndex?: (id: CompetitorId) => CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	selectedRounds,
	rounds,
	resultRows,
	getCompetitorSelectionIndex,
	clickCompetitorRow,
}) => {
	const shouldShowSums = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 1,
		[selectedRounds],
	);

	const shouldShowGrids = useMemo(
		() => selectedRounds.some((isSelected) => isSelected),
		[selectedRounds],
	);

	return (
		<TableWrapperStyled data-testid="adjudicator-table">
			<TableTitleStyled>{adjudicatorName}</TableTitleStyled>
			<ResultsTableStyled>
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
							clickCompetitorRow={clickCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
