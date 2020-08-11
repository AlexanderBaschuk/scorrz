import { Competitor, CompetitorId } from "./model/types";
import {
	SumAndGrid,
	calculateFinalResults,
	calculateGridScores,
} from "./Calculations/calculations";
import { allResultsSelector, competitorsSelector } from "./Scorrz.selectors";
import { useCallback, useMemo } from "react";

import { CompetitorFinalResultRow } from "./FinalTable/FinalTable";
import { CompetitorRow } from "./AdjudicatorTable/AdjudicatorTable";
import { useSelector } from "react-redux";

export const useResults = () => {
	const competitors = useSelector(competitorsSelector);
	const results = useSelector(allResultsSelector);

	const sumsAndGrids: Map<CompetitorId, SumAndGrid>[] = useMemo(
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

	const finalResults = useMemo(() => {
		const allGrids = sumsAndGrids.map((adjResults) => {
			const gridsMap = new Map<CompetitorId, number>();
			adjResults.forEach((value, id) => gridsMap.set(id, value.grid));
			return gridsMap;
		});
		const finalResults = calculateFinalResults(allGrids);

		return Array.from(finalResults, ([id, value]) => ({
			place: value.place,
			id,
			name: getCompetitor(id)?.name ?? "",
			gridSum: value.gridSum,
		})).sort((result1, result2) => {
			const diff = result1.place - result2.place;
			if (diff !== 0) return diff;
			if (result1.id === result2.id) return 0;
			return result1.id > result2.id ? 1 : -1;
		});
	}, [getCompetitor, sumsAndGrids]);

	return {
		resultsByAdjudicators,
		finalResults,
	};
};
