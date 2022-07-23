import SellToOpen from "../src/SellToOpen";

describe("SellToOpen class tests", () => {
  test("new instance of class prints all properties correctly", () => {
    const option: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    expect(option.ticker).toBe("AAPL");
    expect(option.transactionDate).toBe("date");
    expect(option.strike).toBe(135);
    expect(option.callPut).toBe("P");
    expect(option.premium).toBe(400);
    expect(option.expiration).toBe("date");
  });
  test("closeOption changes open to false", () => {
    const option: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    option.closeOption();
    expect(option.open).toBe(false);
  });
});
