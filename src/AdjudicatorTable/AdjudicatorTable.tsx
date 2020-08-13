import React, { useMemo } from "react";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { AdjudicatorTableRowView } from "@/model/types";
import { AdjudicatorTableWrapperStyled } from "./AdjudicatorTable.styles";

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

	return (
		<AdjudicatorTableWrapperStyled>
			<table>
				<AdjudicatorTableHeader
					adjudicatorName={adjudicatorName}
					selectedRounds={selectedRounds}
					rounds={rounds}
					shouldShowSums={shouldShowSums}
				/>
				{resultRows.map((row) => (
					<AdjudicatorTableRow
						key={row.id}
						name={row.name}
						selectedRounds={selectedRounds}
						scores={row.scores}
						sum={row.sum}
						gridScore={row.gridScore}
						shouldShowSums={shouldShowSums}
					/>
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
