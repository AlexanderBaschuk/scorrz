import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/components/common/ControlPanel.styles";

import { AdjudicatorSelectionButton } from "./AdjudicatorSelectionButton";
import { ButtonGroupStyled } from "@/components/common/Button.styles";
import React from "react";

export interface AdjudicatorSelectionProps {
	adjudicators: string[];
	selectedAdjudicators: boolean[];
	toggleAdjudicator: (id: number) => void;
}

export const AdjudicatorSelection: React.FC<AdjudicatorSelectionProps> = ({
	adjudicators,
	selectedAdjudicators,
	toggleAdjudicator,
}) => {
	return (
		<ControlPanelStyled>
			<ControlPanelTitleStyled>Adjudicators: </ControlPanelTitleStyled>
			<ButtonGroupStyled data-testid="adjudicators-selection">
				{adjudicators.map((adj, id) => (
					<AdjudicatorSelectionButton
						key={id}
						id={id}
						isSelected={selectedAdjudicators[id] === true}
						onClick={toggleAdjudicator}
					>
						{adj}
					</AdjudicatorSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
