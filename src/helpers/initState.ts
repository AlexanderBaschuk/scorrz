import {
	AdjudicatorResults,
	Competitor,
	ResultLine,
	Round,
	State,
} from "@/types";

import { CompetitionResultsDto } from "@/contracts";

export const initStateFromDto = (dto: CompetitionResultsDto): State => ({
	isLoading: false,
	eventTitle: dto.eventTitle,
	competitionTitle: dto.competitionTitle,
	rounds: dto.rounds?.map(
		(r): Round => ({ name: r.name, shortName: r.shortName }),
	),
	roundGroups: [
		{ name: "Recall", rounds: [0, 1] },
		{ name: "Total", rounds: [0, 1, 2] },
	],
	competitors: dto.competitors?.map(
		(c): Competitor => ({ id: c.id, name: c.name, school: c.school }),
	),
	results: dto.results?.map(
		(res): AdjudicatorResults => ({
			adjudicatorName: res.adjudicatorName,
			resultLines: res.resultLines.map(
				(line): ResultLine => ({
					competitorId: line.competitorId,
					score: line.score,
				}),
			),
		}),
	),
	selectedAdjudicators: dto.results?.map((_) => true),
	selectedRound: undefined,
	selectedRoundGroup: 1, // TODO
	selectedCompetitors: [null, null, null, null, null],
});
