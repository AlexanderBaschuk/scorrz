import { CompetitorId, Score } from "@/model/types";

import React from "react";

export interface FinalTableRowProps {
	place: number;
	id: CompetitorId;
	name: string;
	gridSum: Score;
}

export const FinalTableRow: React.FC<FinalTableRowProps> = ({
	place,
	id,
	name,
	gridSum,
}) => {
	return (
		<tr>
			<td>{place}</td>
			<td>{id}</td>
			<td>{name}</td>
			<td>{Math.round(gridSum * 100) / 100}</td>
		</tr>
	);
};
