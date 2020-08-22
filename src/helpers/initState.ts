import {
	AdjudicatorResults,
	Competitor,
	ResultLine,
	Round,
	RoundGroup,
	State,
} from "@/types";

import { CompetitionResultsDto } from "@/contracts";

export const initStateFromDto = (dto: CompetitionResultsDto): State => ({
	isLoading: false,
	eventTitle: dto.eventTitle,
	competitionTitle: dto.competitionTitle,
	rounds: dto.rounds?.map(
		(r): Round => ({ name: r.name, shortName: r.shortName }),
	) ?? [{ name: "", shortName: "" }],
	roundGroups: dto.roundGroups?.map(
		(rg): RoundGroup => ({ name: rg.name, rounds: rg.rounds }),
	) ?? [{ name: "Total", rounds: dto.rounds?.map((_, i) => i) ?? [] }],
	competitors:
		dto.competitors?.map(
			(c): Competitor => ({ id: c.id, name: c.name, school: c.school }),
		) ?? [],
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
	selectedRoundGroup: dto.roundGroups ? dto.roundGroups.length - 1 : 0,
	selectedCompetitors: [null, null, null, null, null],
});
