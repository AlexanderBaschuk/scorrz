import React, { useCallback, useEffect } from "react";
import {
	adjudicatorTablesSelector,
	adjudicatorsSelector,
	finalTableSelector,
	selectedAdjudicatorsSelector,
} from "./Scorrz.selectors";
import { calculate, toggleAdjudicator } from "./actions";
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
	const selectedAdjudicators = useSelector(selectedAdjudicatorsSelector);

	const toggleAdjudicatorInternal = useCallback(
		(id: number | null) => {
			dispatch(toggleAdjudicator(id));
		},
		[dispatch],
	);

	return (
		<>
			<AdjudicatorSelection
				adjudicators={adjudicators}
				selectedAdjudicators={selectedAdjudicators}
				toggleAdjudicator={toggleAdjudicatorInternal}
			/>
			{adjudicatorTables.map((adjResults, i) => (
				adjResults && <AdjudicatorTable key={i} {...adjResults} />
			))}
			{finalTable && <FinalTable {...finalTable} />}
		</>
	);
};
