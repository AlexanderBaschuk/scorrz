import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { AdjudicatorTableRowView } from "@/model/types";
import { AdjudicatorTableWrapperStyled } from "./AdjudicatorTable.styles";
import React from "react";

interface AdjudicatorTableProps {
	adjudicatorName: string;
	rounds: string[];
	resultRows: AdjudicatorTableRowView[];
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	rounds,
	resultRows,
}) => {
	return (
		<AdjudicatorTableWrapperStyled>
			<table>
				<AdjudicatorTableHeader
					adjudicatorName={adjudicatorName}
					rounds={rounds}
				/>
				{resultRows.map((row) => (
					<AdjudicatorTableRow
						key={row.id}
						name={row.name}
						rounds={rounds}
						scores={row.scores}
						sum={row.sum}
						gridScore={row.gridScore}
					/>
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
