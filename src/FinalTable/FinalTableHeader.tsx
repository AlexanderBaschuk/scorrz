import React from "react";
import { ThGrid } from "./FinalTable.styles";

export const FinalTableHeader: React.FC = () => {
	return (
		<tr>
			<th>#</th>
			<th colSpan={2}>Competitor</th>
			<ThGrid>Grid score</ThGrid>
		</tr>
	);
};
