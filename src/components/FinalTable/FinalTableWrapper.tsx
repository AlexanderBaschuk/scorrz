import {
	CompetitorId,
	CompetitorSelectionIndex,
	FinalTableView,
} from "@/types";
import React, { useCallback } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";
import { useDispatch, useSelector } from "react-redux";

import { FinalTableHeader } from "./FinalTableHeader";
import { FinalTableRow } from "./FinalTableRow";
import { selectedCompetitorsSelector } from "@/selectors";
import { toggleCompetitor } from "@/actions";

interface FinalTableWrapperProps {
	tableView: FinalTableView;
}

export const FinalTableWrapper: React.FC<FinalTableWrapperProps> = ({
	tableView,
}) => {
	const dispatch = useDispatch();

	const selectedCompetitors = useSelector(selectedCompetitorsSelector);

	const getCompetitorSelectionIndex = useCallback(
		(id: CompetitorId): CompetitorSelectionIndex => {
			const index = selectedCompetitors.findIndex((value) => value === id);
			return index >= 0 ? index : null;
		},
		[selectedCompetitors],
	);

	const clickCompetitorRow = useCallback(
		(id: CompetitorId) => {
			dispatch(toggleCompetitor(id));
		},
		[dispatch],
	);

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
							clickCompetitorRow={clickCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
