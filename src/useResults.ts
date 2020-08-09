import { allResultsSelector, competitorsSelector } from "./Scorrz.selectors";
import { useCallback, useMemo } from "react";

import { CompetitorId } from "./model/types";
import { calculateGridScores } from "./Calculations/calculations";
import { useSelector } from "react-redux";

export const useResults = () => {
	const competitors = useSelector(competitorsSelector);
	const results = useSelector(allResultsSelector);

	const getCompetitor = useCallback(
		(id: CompetitorId) => {
			return competitors.filter((c) => c.id === id)[0];
		},
		[competitors],
	);

	const getAdjudicatorResults = useCallback(
		(adjudicatorId: number) => {
			const resultLines = results[adjudicatorId].resultLines;
			const sumsAndGrids = calculateGridScores(resultLines);
			return resultLines
				.map((r) => ({
					id: r.competitorId,
					name: getCompetitor(r.competitorId).name,
					scores: r.score,
					sum: sumsAndGrids.get(r.competitorId).sum,
					gridScore: sumsAndGrids.get(r.competitorId).grid,
				}))
				.sort((result1, result2) => {
					const diff = result2.sum - result1.sum;
					if (diff !== 0) return diff;
					if (result1.id === result2.id) return 0;
					return result1.id > result2.id ? 1 : -1;
				});
		},
		[results, getCompetitor],
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

	return {
		getAdjudicatorResults,
		finalResults,
	};
};
