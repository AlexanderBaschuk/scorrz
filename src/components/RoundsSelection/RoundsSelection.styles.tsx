import { Button } from "@/components/common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected?: boolean;
	isFocused?: boolean;
}

enum RoundSelectionButtonColor {
	Idle = "#ffffff",
	HoverIdle = "#fff6ed",
	Selected = "#f3ad63",
	HoverSelected = "#f1a250",
}

export const RoundsSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) =>
		getBackgroundColor(props.isSelected === true, props.isFocused === true)};
	color: ${(props) =>
		props.isSelected === true ? "white" : RoundSelectionButtonColor.Selected};
	font-size: 1.2em;

	&:hover {
		background-color: ${(props) =>
			props.isSelected
				? RoundSelectionButtonColor.HoverSelected
				: RoundSelectionButtonColor.HoverIdle};
	}
`;

const getBackgroundColor = (isSelected: boolean, isFocused: boolean) => {
	switch (true) {
		case !isSelected && isFocused:
			return RoundSelectionButtonColor.HoverIdle;
		case isSelected && !isFocused:
			return RoundSelectionButtonColor.Selected;
		case isSelected && isFocused:
			return RoundSelectionButtonColor.HoverSelected;
		default:
			return RoundSelectionButtonColor.Idle;
	}
};
