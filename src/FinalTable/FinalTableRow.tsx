import { CompetitorId, Score } from "@/model/types";

import React from "react";

export interface FinalTableRowProps {
	place: number;
	competitorId: CompetitorId;
	competitorName: string;
	gridScore: Score;
}

export const FinalTableRow: React.FC<FinalTableRowProps> = ({
	place,
	competitorId,
	competitorName,
	gridScore,
}) => {
	return (
		<tr>
			<td>{place}</td>
			<td>{competitorId}</td>
			<td>{competitorName}</td>
			<td>{Math.round(gridScore * 100) / 100}</td>
		</tr>
	);
};
