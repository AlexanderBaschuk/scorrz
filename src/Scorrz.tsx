import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { FinalTable } from "./FinalTable/FinalTable";
import React from "react";
import { useResults } from "./useResults";

export const Scorrz: React.FC = () => {
	const rounds = ["H", "L", "S"];

	const { resultsByAdjudicators, finalResults } = useResults();

	return (
		<>
			{resultsByAdjudicators.map((adjResults, i) => (
				<AdjudicatorTable
					key={i}
					adjudicatorName={adjResults.adjudicator}
					rounds={rounds}
					results={adjResults.resultLines}
				/>
			))}
			<FinalTable results={finalResults} />
		</>
	);
};
