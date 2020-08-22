import React, { useCallback } from "react";
import {
	ResultsTableStyled,
	TableTitleStyled,
	TableWrapperStyled,
} from "@/components/common/Table.styles";

import { FinalTable } from "./FinalTable";
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
		focusedCompetitor,
		selectCompetitor,
		hoverCompetitor,
	} = useCompetitorSelection();

	return (
		<FinalTable
			results={tableView.results}
			focusedCompetitor={focusedCompetitor}
			getCompetitorSelectionIndex={getCompetitorSelectionIndex}
			clickCompetitorRow={selectCompetitor}
			hoverCompetitorRow={hoverCompetitor}
		/>
	);
};
