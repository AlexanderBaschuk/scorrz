import { CompetitorId, ResultLine } from "@/model/types";

import { getSharedGridScore } from "./gridScores";

export interface SumAndGrid {
	sum: number;
	grid: number;
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
