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
	results: AdjudicatorTableRowProps[];
}

export const AdjudicatorTable: React.FC<AdjudicatorTableProps> = ({
	adjudicatorName,
	rounds,
	results,
}) => {
	return (
		<AdjudicatorTableWrapperStyled>
			<table>
				<AdjudicatorTableHeader
					adjudicatorName={adjudicatorName}
					rounds={rounds}
				/>
				{results.map((r) => (
					<AdjudicatorTableRow key={r.id} {...r} />
				))}
			</table>
		</AdjudicatorTableWrapperStyled>
	);
};
