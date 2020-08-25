import React from "react";

export const FinalTableHeader: React.FC = () => {
	return (
		<tr>
			<th>#</th>
			<th colSpan={2}>Competitor</th>
			<th>School</th>
			<th>Score</th>
		</tr>
	);
};
