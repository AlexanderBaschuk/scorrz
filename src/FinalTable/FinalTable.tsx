import { FinalTableRow, FinalTableRowProps } from "./FinalTableRow";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRowView } from "@/model/types";
import { FinalTableWrapperStyled } from "./FinalTable.styles";
import React from "react";

interface FinalTableProps {
	results: FinalTableRowView[];
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
