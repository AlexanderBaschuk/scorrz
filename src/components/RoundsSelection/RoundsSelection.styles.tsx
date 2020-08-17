import { Button } from "@/components/common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

enum RoundSelectionButtonColor {
	Main = "#f3ad63",
	HoverSelected = "#f1a250",
	HoverUnselected = "#fff6ed",
}

export const RoundsSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) =>
		props.isSelected ? RoundSelectionButtonColor.Main : "white"};
	color: ${(props) =>
		props.isSelected ? "white" : RoundSelectionButtonColor.Main};
	font-size: 1.2em;

	&:hover {
		background-color: ${(props) =>
			props.isSelected
				? RoundSelectionButtonColor.HoverSelected
				: RoundSelectionButtonColor.HoverUnselected};
	}
`;
