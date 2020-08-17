import { AdjudicatorResults, CompetitorId, ResultLine } from "@/types";

export class AdjudicatorResultsBuilder implements AdjudicatorResults {
	adjudicatorName: string = "Adjudicator";
	resultLines: ResultLine[] = [];

	withName = (name: string) => {
		this.adjudicatorName = name;
		return this;
	};

	withResult = (competitorId: CompetitorId, score: number[]) => {
		this.resultLines.push({ competitorId, score });
		return this;
	};
}
