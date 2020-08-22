import { CompetitorId, Score } from "./types";

export interface CompetitionResultsDto {
	eventTitle: string;
	competitionTitle: string;
	rounds: RoundDto[];
	roundGroups: RoundGroupDto[];
	competitors: CompetitorDto[];
	results: AdjudicatorResultsDto[];
}

export interface RoundDto {
	name: string;
	shortName: string;
}

export interface RoundGroupDto {
	name: string;
	rounds: number[];
}

export interface CompetitorDto {
	id: CompetitorId;
	name: string;
	school: string;
}

export interface AdjudicatorResultsDto {
	adjudicatorName: string;
	resultLines: ResultLineDto[];
}

export interface ResultLineDto {
	competitorId: CompetitorId;
	score: Score[];
}
