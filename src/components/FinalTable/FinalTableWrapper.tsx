import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import { FinalTableView } from "@/types";
import React from "react";
import { useCompetitorSelection } from "../common/useCompetitorSelection";

interface FinalTableWrapperProps {
	tableView: FinalTableView;
}

export const FinalTableWrapper: React.FC<FinalTableWrapperProps> = ({
	tableView,
}) => {
	const {
		getCompetitorSelectionIndex,
		selectCompetitor,
	} = useCompetitorSelection();

	return (
		<TableWrapperStyled data-testid="final-table">
			<TableTitleStyled>Total</TableTitleStyled>
			<ResultsTableStyled>
				<thead>
					<FinalTableHeader />
				</thead>
				<tbody>
					{tableView.results.map((resultRow) => (
						<FinalTableRow
							key={resultRow.id}
							place={resultRow.place}
							id={resultRow.id}
							name={resultRow.name}
							gridSum={resultRow.gridSum}
							selectionIndex={
								getCompetitorSelectionIndex?.(resultRow.id) ?? null
							}
							clickCompetitorRow={selectCompetitor}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
