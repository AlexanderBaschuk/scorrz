import { alignByDecimal } from "./alignment";

describe("alignByDecimal()", () => {
	test.each`
		value    | digits | expectedResult
		${0}     | ${2}   | ${"\u20070"}
		${0.5}   | ${2}   | ${"\u20070.5"}
		${1}     | ${2}   | ${"\u20071"}
		${5}     | ${1}   | ${"5"}
		${5}     | ${2}   | ${"\u20075"}
		${5}     | ${3}   | ${"\u2007\u20075"}
		${9.9}   | ${3}   | ${"\u2007\u20079.9"}
		${10}    | ${3}   | ${"\u200710"}
		${null}  | ${2}   | ${null}
		${"abc"} | ${2}   | ${"abc"}
	`("Align $value to $digits digits", ({ value, digits, expectedResult }) => {
		const result = alignByDecimal(value, digits);
		expect(result).toEqual(expectedResult);
	});
});
