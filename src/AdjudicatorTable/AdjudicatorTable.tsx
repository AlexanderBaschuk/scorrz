import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { AdjudicatorTableRowView } from "@/model/types";
import { AdjudicatorTableWrapperStyled } from "./AdjudicatorTable.styles";
import React from "react";

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
	return (
		<AdjudicatorTableWrapperStyled>
			<table>
				<AdjudicatorTableHeader
					adjudicatorName={adjudicatorName}
					selectedRounds={selectedRounds}
					rounds={rounds}
				/>
				{resultRows.map((row) => (
					<AdjudicatorTableRow
						key={row.id}
						name={row.name}
						selectedRounds={selectedRounds}
						scores={row.scores}
						sum={row.sum}
						gridScore={row.gridScore}
					/>
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
