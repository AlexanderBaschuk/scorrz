import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/components/common/ControlPanel.styles";

import { ButtonGroupStyled } from "@/components/common/Button.styles";
import React from "react";
import { RoundsSelectionButton } from "./RoundsSelectionButton";

export interface RoundsSelectionProps {
	rounds: string[];
	selectedRound?: number;
	selectedRoundGroup?: number;
	toggleRound: (id: number) => void;
}

export const RoundsSelection: React.FC<RoundsSelectionProps> = ({
	rounds,
	selectedRound,
	toggleRound,
}) => {
	return (
		<ControlPanelStyled>
			<ControlPanelTitleStyled>Rounds: </ControlPanelTitleStyled>
			<ButtonGroupStyled data-testid="rounds-selection">
				{rounds.map((round, id) => (
					<RoundsSelectionButton
						key={id}
						id={id}
						isSelected={selectedRound === id}
						onClick={toggleRound}
					>
						{round}
					</RoundsSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
