import {
	ControlPanelStyled,
	ControlPanelTitleStyled,
} from "@/Common/ControlPanel.styles";

import { ButtonGroupStyled } from "@/Common/Button.styles";
import React from "react";
import { RoundsSelectionButton } from "./RoundsSelectionButton";

export interface RoundsSelectionProps {
	rounds: string[];
	selectedRounds: boolean[];
	toggleRound: (id: number) => void;
}

export const RoundsSelection: React.FC<RoundsSelectionProps> = ({
	rounds,
	selectedRounds,
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
						isSelected={selectedRounds[id] === true}
						onClick={toggleRound}
					>
						{round}
					</RoundsSelectionButton>
				))}
			</ButtonGroupStyled>
		</ControlPanelStyled>
	);
};
