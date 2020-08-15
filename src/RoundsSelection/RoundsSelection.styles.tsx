import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

const BUTTON_COLOR = "#f3ad63";
const BORDER_COLOR = "#ea884f";

export const RoundsSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) => (props.isSelected ? BUTTON_COLOR : "white")};
	color: ${(props) => (props.isSelected ? "white" : BUTTON_COLOR)};
	border-color: ${BORDER_COLOR};
	font-size: 1.2em;
`;
