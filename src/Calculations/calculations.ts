import { CompetitorId, ResultLine } from "@/model/types";

import { getSharedGridScore } from "./gridScores";

export interface SumAndGrid {
	sum: number;
	grid: number;
}

export interface GridSumAndPlace {
	place: number;
	gridSum: number;
}

export const calculateGridScores = (
	scores: ResultLine[],
): Map<CompetitorId, SumAndGrid> => {
	const scoreSums = scores.map((s) => ({
		competitorId: s.competitorId,
		scoreSum: s.score.reduce((sum, current) => (sum += current), 0),
	}));

	const result = new Map<CompetitorId, SumAndGrid>();

	for (let i = 0; i < scoreSums.length; i++) {
		const currentCompetitorId = scoreSums[i].competitorId;
		const currentScoreSum = scoreSums[i].scoreSum;

		if (currentScoreSum < 0) {
			result.set(currentCompetitorId, null);
			continue;
		}

		let place = 1;
		let count = 0;
		for (let j = 0; j < scoreSums.length; j++) {
			if (scoreSums[j].scoreSum > currentScoreSum) place++;
			if (scoreSums[j].scoreSum === currentScoreSum) count++;
		}

		const gridScore = getSharedGridScore(place, count);
		result.set(currentCompetitorId, { sum: currentScoreSum, grid: gridScore });
	}

	return result;
};

export const calculateFinalResults = (
	adjudicatorResults: Map<CompetitorId, SumAndGrid>[],
): Map<CompetitorId, GridSumAndPlace> => {
	const finalGrids = new Map<CompetitorId, number>();
	for (const adj of adjudicatorResults) {
		for (const [id, adjResult] of Array.from(adj)) {
			if (finalGrids.has(id)) {
				const existingGrid = finalGrids.get(id);
				finalGrids.set(id, existingGrid + adjResult.grid);
			} else {
				finalGrids.set(id, adjResult.grid);
			}
		}
	}

	const finalResults = new Map<CompetitorId, GridSumAndPlace>();
	finalGrids.forEach((competitorGrid, id) => {
		const place =
			Array.from(finalGrids.values()).filter((grid) => grid > competitorGrid)
				.length + 1;
		finalResults.set(id, { gridSum: competitorGrid, place });
	});
	return finalResults;
};
