import { AdjudicatorTableView, CompetitorId, CompetitorSelectionIndex } from "@/types";
import React, { useCallback, useMemo } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";
import { roundsNamesSelector, selectedCompetitorsSelector, selectedRoundsSelector } from "@/selectors";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { toggleCompetitor } from "@/actions";

interface AdjudicatorTableWrapperProps {
	tableView: AdjudicatorTableView;
}

export const AdjudicatorTableWrapper: React.FC<AdjudicatorTableWrapperProps> = ({
	tableView,
}) => {
	const dispatch = useDispatch();

	const selectedRounds = useSelector(selectedRoundsSelector);
	const rounds = useSelector(roundsNamesSelector);
	const selectedCompetitors = useSelector(selectedCompetitorsSelector);

	const shouldShowSums = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 1,
		[selectedRounds],
	);

	const shouldShowGrids = useMemo(
		() => selectedRounds.some((isSelected) => isSelected),
		[selectedRounds],
	);

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
		<TableWrapperStyled data-testid="adjudicator-table">
			<TableTitleStyled>{tableView.adjudicatorName}</TableTitleStyled>
			<ResultsTableStyled>
				<thead>
					<AdjudicatorTableHeader
						selectedRounds={selectedRounds}
						rounds={rounds}
						shouldShowSums={shouldShowSums}
						shouldShowGrids={shouldShowGrids}
					/>
				</thead>
				<tbody>
					{tableView.resultRows.map((row) => (
						<AdjudicatorTableRow
							key={row.id}
							id={row.id}
							name={row.name}
							selectedRounds={selectedRounds}
							scores={row.scores}
							sum={row.sum}
							gridScore={row.gridScore}
							shouldShowSums={shouldShowSums}
							shouldShowGrids={shouldShowGrids}
							selectionIndex={getCompetitorSelectionIndex?.(row.id) ?? null}
							clickCompetitorRow={clickCompetitorRow}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
