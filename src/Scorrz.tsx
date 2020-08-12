import React, { useEffect } from "react";
import {
	adjudicatorTablesSelector,
	finalTableSelector,
} from "./Scorrz.selectors";
import { useDispatch, useSelector } from "react-redux";

import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "./FinalTable/FinalTable";
import { calculate } from "./rootReducer";

export const Scorrz: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("calculating results")
		dispatch(calculate());
	}, [dispatch]);

	const adjudicatorTables = useSelector(adjudicatorTablesSelector);
	const finalTable = useSelector(finalTableSelector);

	return (
		<>
			{adjudicatorTables.map((adjResults, i) => (
				<AdjudicatorTable key={i} {...adjResults} />
			))}
			<FinalTable {...finalTable} />
		</>
	);
};
