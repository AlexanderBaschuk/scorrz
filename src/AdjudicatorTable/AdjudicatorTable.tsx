import React, { useMemo } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/Common/Table.styles";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { AdjudicatorTableRowView } from "@/model/types";

interface AdjudicatorTableProps {
	adjudicatorName: string;
	selectedRounds: boolean[];
	rounds: string[];
	resultRows: AdjudicatorTableRowView[];
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	selectedRounds,
	rounds,
	resultRows,
}) => {
	const shouldShowSums = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 1,
		[selectedRounds],
	);

	const shouldShowGrids = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 0,
		[selectedRounds],
	);

	return (
		<TableWrapperStyled>
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
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
