type CompetitorId = string;

interface Competitor {
	id: CompetitorId;
	name: string;
	school: string;
}

interface Adjudicator {
	id: number;
	name: string;
}

interface ResultLine {
	competitorId: CompetitorId;
	score: number[];
	cumulativeSum: number[];
	cumulativeGridScore: number[];
}

interface AdjudicatorResults {
	adjudicatorId: number;
	resultLines: ResultLine[];
}
