const FIGURE_SPACE = "\u2007";

export const alignByDecimal = (value, digits: number = 3) => {
	if (value === null || value === undefined) return value;
	if (isNaN(value)) return value;

	const actualDigits = value < 10 ? 1 : 1 + Math.floor(Math.log10(value));
	const additionalSpaces = digits - actualDigits;
	return FIGURE_SPACE.repeat(additionalSpaces) + value.toString();
};
