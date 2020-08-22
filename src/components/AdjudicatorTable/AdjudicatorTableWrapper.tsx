import {} from "@/components/common/Table.styles";

import { AdjudicatorTable } from "./AdjudicatorTable";
import { AdjudicatorTableView } from "@/types";
import React from "react";
import { selectedRoundsSelector } from "@/selectors";
import { useCompetitorSelection } from "../common/useCompetitorSelection";
import { useSelector } from "react-redux";

interface AdjudicatorTableWrapperProps {
	tableView: AdjudicatorTableView;
}

export const AdjudicatorTableWrapper: React.FC<AdjudicatorTableWrapperProps> = ({
	tableView,
}) => {
	const selectedRounds = useSelector(selectedRoundsSelector);

	const {
		getCompetitorSelectionIndex,
		focusedCompetitor,
		selectCompetitor,
		hoverCompetitor,
	} = useCompetitorSelection();

	return (
		<AdjudicatorTable
			adjudicatorName={tableView.adjudicatorName}
			selectedRounds={selectedRounds}
			rounds={tableView.rounds}
			resultRows={tableView.resultRows}
			focusedCompetitor={focusedCompetitor}
			getCompetitorSelectionIndex={getCompetitorSelectionIndex}
			clickCompetitorRow={selectCompetitor}
			hoverCompetitorRow={hoverCompetitor}
		/>
	);
};
