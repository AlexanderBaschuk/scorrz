import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "./FinalTable/FinalTable";
import React from "react";
import { adjudicatorsSelector } from "./Scorrz.selectors";
import { useResults } from "./useResults";
import { useSelector } from "react-redux";

export const Scorrz: React.FC = () => {
	const adjudicators = useSelector(adjudicatorsSelector);
	const rounds = ["H", "L", "S"];

	const { getAdjudicatorResults, finalResults } = useResults();

	return (
		<>
			{adjudicators.map((adj, i) => (
				<AdjudicatorTable
					key={i}
					adjudicatorName={adj.name}
					rounds={rounds}
					results={getAdjudicatorResults(i)}
				/>
			))}
			<FinalTable results={finalResults} />
		</>
	);
};
