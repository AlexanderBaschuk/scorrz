import React, { useCallback, useMemo } from "react";
import {
	adjudicatorsSelector,
	allResultsSelector,
	competitorsSelector,
} from "./Scorrz.selectors";

import { AdjudicatorTable } from "./AdjudicatorTable/AdjudicatorTable";
import { CompetitorId } from "./model/types";
import { FinalTable } from "./FinalTable/FinalTable";
import { useSelector } from "react-redux";

export const Scorrz: React.FC = () => {
	const competitors = useSelector(competitorsSelector);
	const adjudicators = useSelector(adjudicatorsSelector);
	const rounds = ["H", "L", "S"];
	const results = useSelector(allResultsSelector);

	const getCompetitor = useCallback(
		(id: CompetitorId) => {
			return competitors.filter((c) => c.id === id)[0];
		},
		[competitors],
	);

	const getAdjudicatorResults = useCallback(
		(adjudicatorId) =>
			results[adjudicatorId].resultLines.map((r) => ({
				id: r.competitorId,
				name: getCompetitor(r.competitorId).name,
				scores: r.score,
				sum: r.cumulativeSum[rounds.length - 1],
				gridScore: r.cumulativeGridScore[rounds.length - 1],
			})),
		[results, getCompetitor, rounds.length],
	);

	const finalResults = useMemo(
		() =>
			// TODO: calculate the results
			competitors.map((c, i) => ({
				place: i + 1,
				id: c.id,
				name: c.name,
				gridSum: 300 - 10 * i,
			})),
		[competitors],
	);

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
