import React, { useCallback, useEffect } from "react";
import {
	adjudicatorTablesSelector,
	adjudicatorsSelector,
	finalTableSelector,
	selectedAdjudicatorSelector,
} from "./Scorrz.selectors";
import { calculate, selectAdjudicator } from "./actions";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorSelection } from "./AdjudicatorSelection/AdjudicatorSelection";
import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "./FinalTable/FinalTable";

export const Scorrz: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculate());
	}, [dispatch]);

	const adjudicatorTables = useSelector(adjudicatorTablesSelector);
	const finalTable = useSelector(finalTableSelector);
	const adjudicators = useSelector(adjudicatorsSelector);
	const selectedAdjudicator = useSelector(selectedAdjudicatorSelector);

	const selectAdjudicatorInternal = useCallback((id: number | null) => {
		dispatch(selectAdjudicator(id));
	}, [dispatch]);

	return (
		<>
			<AdjudicatorSelection
				adjudicators={adjudicators}
				selectedAdjudicator={selectedAdjudicator}
				selectAdjudicator={selectAdjudicatorInternal}
			/>
			{adjudicatorTables.map((adjResults, i) => (
				<AdjudicatorTable key={i} {...adjResults} />
			))}
			<FinalTable {...finalTable} />
		</>
	);
};
