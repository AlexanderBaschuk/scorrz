import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

enum AdjudicatorSelectionButtonColor {
	Main = "#00a3d8",
	HoverSelected = "#0097c7",
	HoverUnselected = "#ebf5f9",
}

export const AdjudicatorSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) =>
		props.isSelected ? AdjudicatorSelectionButtonColor.Main : "white"};
	color: ${(props) =>
		props.isSelected ? "white" : AdjudicatorSelectionButtonColor.Main};
	font-size: 1.2em;

	&:hover {
		background-color: ${(props) =>
			props.isSelected
				? AdjudicatorSelectionButtonColor.HoverSelected
				: AdjudicatorSelectionButtonColor.HoverUnselected};
	}
`;
