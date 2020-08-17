import { CompetitorId, Score } from "@/model/types";
import { TdGrid, TdPlace } from "./FinalTable.styles";

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
			<TdPlace>{place}</TdPlace>
			<td>{id}</td>
			<td>{name}</td>
			<TdGrid>{Math.round(gridSum * 100) / 100}</TdGrid>
		</tr>
	);
};
