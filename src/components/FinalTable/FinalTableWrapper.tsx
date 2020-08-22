import React, { useCallback } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import { FinalTableView } from "@/types";
import { useCompetitorSelection } from "../common/useCompetitorSelection";

interface FinalTableWrapperProps {
	tableView: FinalTableView;
}

export const FinalTableWrapper: React.FC<FinalTableWrapperProps> = ({
	tableView,
}) => {
	const {
		getCompetitorSelectionIndex,
		isFocused,
		selectCompetitor,
		hoverCompetitor,
	} = useCompetitorSelection();

	const unfocusCompetitor = useCallback(() => {
		hoverCompetitor(undefined);
	}, [hoverCompetitor]);

	return (
		<TableWrapperStyled data-testid="final-table">
			<TableTitleStyled>Total</TableTitleStyled>
			<ResultsTableStyled onMouseLeave={unfocusCompetitor}>
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
							isFocused={isFocused(resultRow.id)}
							clickCompetitorRow={selectCompetitor}
							hoverCompetitorRow={hoverCompetitor}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
