import {
	CompetitorId,
	CompetitorSelectionIndex,
	FinalTableRowView,
} from "@/types";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import React from "react";

interface FinalTableProps {
	results: FinalTableRowView[];
	getCompetitorSelectionIndex?: (id: CompetitorId) => CompetitorSelectionIndex;
	clickCompetitorRow?: (CompetitorId) => void;
}

export const FinalTable: React.FC<FinalTableProps> = ({
	results,
	getCompetitorSelectionIndex,
	clickCompetitorRow,
}) => {
	return (
		<TableWrapperStyled data-testid="final-table">
			<TableTitleStyled>Total</TableTitleStyled>
			<ResultsTableStyled>
				<thead>
					<FinalTableHeader />
				</thead>
				<tbody>
					{results.map((resultRow) => (
						<FinalTableRow
							key={resultRow.id}
							place={resultRow.place}
							id={resultRow.id}
							name={resultRow.name}
							gridSum={resultRow.gridSum}
							selectionIndex={getCompetitorSelectionIndex?.(resultRow.id) ?? null}
							clickCompetitorRow={clickCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
