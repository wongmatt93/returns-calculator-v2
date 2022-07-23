import Stock from "../src/Stock";

describe("Stock class tests", () => {
  test("new Stock instance assigns properties appropriately", () => {
    const stock: Stock = new Stock("AAPL");
    expect(stock.ticker).toBe("AAPL");
    expect(stock.quantity).toBe(0);
    expect(stock.costBasis).toBe(0);
  });
  test("addShares increases quantity to specified amount", () => {
    const stock: Stock = new Stock("AAPL");
    stock.addShares(100);
    expect(stock.quantity).toBe(100);
  });
  test("subtractShares decreases quantity to specified amount", () => {
    const stock: Stock = new Stock("AAPL");
    stock.addShares(100);
    stock.subtractShares(50);
    expect(stock.quantity).toBe(50);
  });
});
