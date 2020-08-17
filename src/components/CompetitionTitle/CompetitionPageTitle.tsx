import { CompetitionTitle, EventTitle } from "./CompetitionPageTitle.styles";

import React from "react";

interface CompetitionPageTitleProps {
	eventTitle: string;
	competitionTitle: string;
}

export const CompetitionPageTitle: React.FC<CompetitionPageTitleProps> = ({
	eventTitle,
	competitionTitle,
}) => {
	return (
		<div>
			<EventTitle>{eventTitle}</EventTitle>
			<CompetitionTitle>{competitionTitle}</CompetitionTitle>
		</div>
	);
};
