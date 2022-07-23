import BuyToOpen from "../src/BuyToOpen";
import SellToClose from "../src/SellToClose";

describe("SellToClose class tests", () => {
  test("new instance of class prints all properties correctly", () => {
    const option: SellToClose = new SellToClose(
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
  test("closeOption changes a BuyToOpen's open to false", () => {
    const closeOption: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const openOption: BuyToOpen = new BuyToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    closeOption.closeOption(openOption);
    expect(openOption.open).toBe(false);
  });
});
