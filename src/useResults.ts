import { Competitor, CompetitorId } from "./model/types";
import { allResultsSelector, competitorsSelector } from "./Scorrz.selectors";
import { useCallback, useMemo } from "react";

import { CompetitorRow } from "./AdjudicatorTable/AdjudicatorTable";
import { calculateGridScores } from "./Calculations/calculations";
import { useSelector } from "react-redux";

export const useResults = () => {
	const competitors = useSelector(competitorsSelector);
	const results = useSelector(allResultsSelector);

	const sumsAndGrids = useMemo(
		() =>
			results.map((adjudicator) =>
				calculateGridScores(adjudicator.resultLines),
			),
		[results],
	);

	const getCompetitor = useCallback(
		(id: CompetitorId): Competitor | undefined => {
			return competitors.find((c) => c.id === id);
		},
		[competitors],
	);

	const resultsByAdjudicators = useMemo(
		() =>
			results.map((adjudicator, adjId) => ({
				adjudicator: adjudicator.adjudicatorName,
				resultLines: adjudicator.resultLines
					.map(
						(r): CompetitorRow => ({
							id: r.competitorId,
							name: getCompetitor(r.competitorId)?.name ?? "",
							scores: r.score,
							sum: sumsAndGrids[adjId].get(r.competitorId).sum,
							gridScore: sumsAndGrids[adjId].get(r.competitorId).grid,
						}),
					)
					.sort((result1, result2) => {
						const diff = result2.sum - result1.sum;
						if (diff !== 0) return diff;
						if (result1.id === result2.id) return 0;
						return result1.id > result2.id ? 1 : -1;
					}),
			})),
		[results, getCompetitor, sumsAndGrids],
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
		resultsByAdjudicators,
		finalResults,
	};
};
