import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/common/Table.styles";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import { FinalTableRowView } from "@/redux/types";
import React from "react";

interface FinalTableProps {
	results: FinalTableRowView[];
}

export const FinalTable: React.FC<FinalTableProps> = ({ results }) => {
	return (
		<TableWrapperStyled data-testid="final-table">
			<TableTitleStyled>Total</TableTitleStyled>
			<ResultsTableStyled>
				<thead>
					<FinalTableHeader />
				</thead>
				<tbody>
					{results.map((resultRow) => (
						<FinalTableRow key={resultRow.id} {...resultRow} />
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
