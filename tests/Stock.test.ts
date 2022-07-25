import Stock from "../src/Stock";
import SellToOpen from "../src/SellToOpen";
import BuyToClose from "../src/BuyToClose";
import BuyToOpen from "../src/BuyToOpen";
import SellToClose from "../src/SellToClose";
import Dividend from "../src/Dividend";

describe("Stock class tests", () => {
  test("new Stock instance assigns properties appropriately", () => {
    const stock: Stock = new Stock("AAPL");
    expect(stock.ticker).toBe("AAPL");
    expect(stock.quantity).toBe(0);
    expect(stock.costBasis).toBe(0);
  });
  test("updateShares updates quantity to specified amount", () => {
    const stock: Stock = new Stock("AAPL");
    stock.updateQuantity(100);
    expect(stock.quantity).toBe(100);
  });
  test("updateQuantity updates quantity to specified amount V2", () => {
    const stock: Stock = new Stock("AAPL");
    stock.updateQuantity(100);
    stock.updateQuantity(50);
    expect(stock.quantity).toBe(50);
  });
  test("updateCostBasis updates quantity to specified amount", () => {
    const stock: Stock = new Stock("AAPL");
    stock.updateCostBasis(100);
    stock.updateCostBasis(50);
    expect(stock.costBasis).toBe(50);
  });
  test("updateCostBaiss updates quantity to specified amount V2", () => {
    const stock: Stock = new Stock("AAPL");
    stock.updateCostBasis(100);
    stock.updateCostBasis(50);
    expect(stock.costBasis).toBe(50);
  });
  test("buyToOpen successfully creates new instance of a Buy to Open option", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    stock.buyToOpen(btoArray, "date", 135, "P", 400, "date");
    expect(btoArray[0]).toEqual({
      ticker: "AAPL",
      transactionDate: "date",
      strike: 135,
      callPut: "P",
      premium: 400,
      expiration: "date",
      open: true,
    });
  });
  test("SellToOpen successfully creates new instance of a Sell to Open option", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    stock.sellToOpen(stoArray, "date", 135, "P", 400, "date");
    expect(stoArray[0]).toEqual({
      ticker: "AAPL",
      transactionDate: "date",
      strike: 135,
      callPut: "P",
      premium: 400,
      expiration: "date",
      open: true,
    });
  });
  test("BuyToClose successfully creates new instance of a Buy to Close option and closes an existing Sell to Open option", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    stock.sellToOpen(stoArray, "date", 135, "P", 400, "date");
    stock.buyToClose(stoArray, btcArray, "date", 135, "P", 400, "date");
    expect(stoArray).toEqual([
      {
        ticker: "AAPL",
        transactionDate: "date",
        strike: 135,
        callPut: "P",
        premium: 400,
        expiration: "date",
        open: false,
      },
    ]);
    expect(btcArray).toEqual([
      {
        ticker: "AAPL",
        transactionDate: "date",
        strike: 135,
        callPut: "P",
        premium: 400,
        expiration: "date",
      },
    ]);
  });
  test("BuyToClose throws error when there is no option position to close", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    stock.sellToOpen(stoArray, "date", 134, "P", 400, "date");
    const result = stock.buyToClose(
      stoArray,
      btcArray,
      "date",
      135,
      "P",
      400,
      "date"
    );
    expect(result).toBe("No option position to close");
    expect(btcArray).toEqual([]);
  });
  test("BuyToClose throws error when there is no option position to close V2", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    const result = stock.buyToClose(
      stoArray,
      btcArray,
      "date",
      135,
      "P",
      400,
      "date"
    );
    expect(result).toBe("No option position to close");
    expect(btcArray).toEqual([]);
  });
  test("SellToClose successfully creates new instance of a Sell to Close option and closes an existing Sell to Open option", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    stock.buyToOpen(btoArray, "date", 135, "P", 400, "date");
    stock.sellToClose(btoArray, stcArray, "date", 135, "P", 400, "date");
    expect(btoArray).toEqual([
      {
        ticker: "AAPL",
        transactionDate: "date",
        strike: 135,
        callPut: "P",
        premium: 400,
        expiration: "date",
        open: false,
      },
    ]);
    expect(stcArray).toEqual([
      {
        ticker: "AAPL",
        transactionDate: "date",
        strike: 135,
        callPut: "P",
        premium: 400,
        expiration: "date",
      },
    ]);
  });
  test("SellToClose throws error when there is no option position to close", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: SellToOpen[] = [];
    const stcArray: BuyToClose[] = [];
    const result = stock.buyToClose(
      btoArray,
      stcArray,
      "date",
      135,
      "P",
      400,
      "date"
    );
    expect(result).toBe("No option position to close");
    expect(stcArray).toEqual([]);
  });
  test("SellToClose throws error when there is no option position to close V2", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: SellToOpen[] = [];
    const stcArray: BuyToClose[] = [];
    stock.buyToOpen(btoArray, "date", 136, "P", 400, "date");
    const result = stock.buyToClose(
      btoArray,
      stcArray,
      "date",
      135,
      "P",
      400,
      "date"
    );
    expect(result).toBe("No option position to close");
    expect(stcArray).toEqual([]);
  });
  test("addDividend method adds dividend to array", () => {
    const dividendArray: Dividend[] = [];
    const stock: Stock = new Stock("AAPL");
    stock.addDividend(dividendArray, 100, "date");
    expect(dividendArray[0]).toEqual({
      ticker: "AAPL",
      amount: 100,
      date: "date",
    });
  });
});
