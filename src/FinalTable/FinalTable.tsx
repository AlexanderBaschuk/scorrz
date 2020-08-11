import { FinalTableRow, FinalTableRowProps } from "./FinalTableRow";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableWrapperStyled } from "./FinalTable.styles";
import React from "react";

export interface FinalTableProps {
	results: FinalTableRowProps[];
}

export const FinalTable: React.FC<FinalTableProps> = ({ results }) => {
	return (
		<FinalTableWrapperStyled>
			<table>
				<FinalTableHeader />
				{results.map((resultRow) => (
					<FinalTableRow key={resultRow.id} {...resultRow} />
				))}
			</table>
		</FinalTableWrapperStyled>
	);
};
