import BuyToClose from "../src/BuyToClose";
import SellToOpen from "../src/SellToOpen";

describe("BuyToClose class tests", () => {
  test("new instance of class prints all properties correctly", () => {
    const option: BuyToClose = new BuyToClose(
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
  test("closeOption changes a SellToOpen's open to false", () => {
    const closeOption: BuyToClose = new BuyToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const openOption: SellToOpen = new SellToOpen(
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
