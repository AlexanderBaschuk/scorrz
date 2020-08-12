import {
	AdjudicatorTableRow,
	AdjudicatorTableRowProps,
} from "./AdjudicatorTableRow";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableWrapperStyled } from "./AdjudicatorTable.styles";
import React from "react";

export interface AdjudicatorTableProps {
	adjudicatorName: string;
	rounds: string[];
	resultRows: AdjudicatorTableRowProps[];
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
				{resultRows.map((r) => (
					<AdjudicatorTableRow key={r.id} {...r} />
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
