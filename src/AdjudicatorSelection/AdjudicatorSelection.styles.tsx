import { Button } from "@/Common/Button.styles";
import styled from "@emotion/styled";

interface ButtonProps {
	isSelected: boolean;
}

const BUTTON_COLOR = "#008cba";
const BORDER_COLOR = "#007090";

export const AdjudicatorSelectionButtonStyled = styled(Button)<ButtonProps>`
	background-color: ${(props) => (props.isSelected ? BUTTON_COLOR : "white")};
	color: ${(props) => (props.isSelected ? "white" : BUTTON_COLOR)};
	border-color: ${BORDER_COLOR};
`;
