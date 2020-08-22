import React, { useMemo } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";
import { roundsNamesSelector, selectedRoundsSelector } from "@/selectors";

import { AdjudicatorTableHeader } from "./AdjudicatorTableHeader";
import { AdjudicatorTableRow } from "./AdjudicatorTableRow";
import { AdjudicatorTableView } from "@/types";
import { useCompetitorSelection } from "../common/useCompetitorSelection";
import { useSelector } from "react-redux";

interface AdjudicatorTableWrapperProps {
	tableView: AdjudicatorTableView;
}

export const AdjudicatorTableWrapper: React.FC<AdjudicatorTableWrapperProps> = ({
	tableView,
}) => {
	const selectedRounds = useSelector(selectedRoundsSelector);
	const rounds = useSelector(roundsNamesSelector);

	const shouldShowSums = useMemo(
		() => selectedRounds.filter((isSelected) => isSelected).length > 1,
		[selectedRounds],
	);

	const shouldShowGrids = useMemo(
		() => selectedRounds.some((isSelected) => isSelected),
		[selectedRounds],
	);

	const {
		getCompetitorSelectionIndex,
		selectCompetitor,
	} = useCompetitorSelection();

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
							clickCompetitorRow={selectCompetitor}
						/>
					))}
				</tbody>
			</ResultsTableStyled>
		</TableWrapperStyled>
	);
};
