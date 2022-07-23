import Dividend from "../src/Dividend";

describe("Dividend class test", () => {
  test("constructor sets properties correctly", () => {
    const dividend: Dividend = new Dividend("AAPL", 100, "date");
    expect(dividend).toEqual({ ticker: "AAPL", amount: 100, date: "date" });
  });
});
