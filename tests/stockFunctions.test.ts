import BuyToClose from "../src/BuyToClose";
import BuyToOpen from "../src/BuyToOpen";
import Dividend from "../src/Dividend";
import SellToClose from "../src/SellToClose";
import SellToOpen from "../src/SellToOpen";
import Stock from "../src/Stock";
import {
  addDividend,
  addStock,
  buyToClose,
  buyToOpen,
  sellToClose,
  sellToOpen,
  updateCostBasis,
  updateStockQuantity,
} from "../src/stockFunctions";

describe("addStock function tests", () => {
  test("successfully add stock to array", () => {
    const stockArray: Stock[] = [];
    addStock("AAPL", stockArray);
    expect(stockArray).toEqual([{ ticker: "AAPL", quantity: 0, costBasis: 0 }]);
  });
  test("unsuccessfully add duplicate stock to array", () => {
    const stockArray: Stock[] = [new Stock("AAPL")];
    const result = addStock("AAPL", stockArray);
    expect(result).toBe(null);
  });
});

describe("updateStockQuantity function tests", () => {
  test("updates stock quantity properly", () => {
    const stock: Stock = new Stock("AAPL");
    updateStockQuantity(stock, 100);
    expect(stock.quantity).toBe(100);
  });

  test("updates stock quantity properly v2", () => {
    const stock: Stock = new Stock("AAPL");
    updateStockQuantity(stock, 100);
    updateStockQuantity(stock, 50);
    expect(stock.quantity).toBe(50);
  });
});

describe("updateCostBasis function tests", () => {
  test("updates cost basis properly", () => {
    const stock: Stock = new Stock("AAPL");
    updateCostBasis(stock, 1000);
    expect(stock.costBasis).toBe(1000);
  });
  test("updates cost basis properly V2", () => {
    const stock: Stock = new Stock("AAPL");
    updateCostBasis(stock, 1000);
    updateCostBasis(stock, 500);
    expect(stock.costBasis).toBe(500);
  });
});

describe("addDividend function tests", () => {
  test("adds dividend to array", () => {
    const dividendArray: Dividend[] = [];
    const stock: Stock = new Stock("AAPL");
    addDividend(dividendArray, stock, 100, "date");
    expect(dividendArray[0].amount).toBe(100);
    expect(dividendArray[0].date).toBe("date");
  });

  test("adds multiple dividends to array", () => {
    const dividendArray: Dividend[] = [];
    const stock: Stock = new Stock("AAPL");
    addDividend(dividendArray, stock, 100, "date");
    addDividend(dividendArray, stock, 100, "date");
    expect(dividendArray[0].amount).toBe(100);
    expect(dividendArray[0].date).toBe("date");
    expect(dividendArray[1].amount).toBe(100);
    expect(dividendArray[1].date).toBe("date");
  });
});

describe("buyToOpen function tests", () => {
  test("adds 1 bto option to bto array", () => {
    const btoArray: BuyToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 1);
    expect(btoArray[0].strike).toBe(135);
    expect(btoArray[0].premium).toBe(400);
  });
  test("adds 2 bto option to bto array", () => {
    const btoArray: BuyToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 2);
    expect(btoArray[0].strike).toBe(135);
    expect(btoArray[0].premium).toBe(400);
    expect(btoArray[1].strike).toBe(135);
    expect(btoArray[1].premium).toBe(400);
  });
  test("adds 7 bto option to bto array", () => {
    const btoArray: BuyToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 7);
    expect(btoArray.length).toBe(7);
  });
});

describe("sellToOpen function tests", () => {
  test("adds 1 sto option to sto array", () => {
    const stoArray: SellToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 1);
    expect(stoArray[0].strike).toBe(135);
    expect(stoArray[0].premium).toBe(400);
  });
  test("adds 2 bto option to bto array", () => {
    const stoArray: SellToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 2);
    expect(stoArray[0].strike).toBe(135);
    expect(stoArray[0].premium).toBe(400);
    expect(stoArray[1].strike).toBe(135);
    expect(stoArray[1].premium).toBe(400);
  });
  test("adds 7 bto option to bto array", () => {
    const stoArray: SellToOpen[] = [];
    const stock: Stock = new Stock("AAPL");
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 7);
    expect(stoArray.length).toBe(7);
  });
});

describe("buyToClose function tests", () => {
  test("successfully closes 1 sto option and adds btc option to array", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 1);
    buyToClose(stoArray, btcArray, stock, "date", 135, "P", 200, "date", 1);
    expect(stoArray[0].open).toBe(false);
    expect(btcArray[0].premium).toBe(200);
  });
  test("successfully closes 1 sto option and adds btc option to array v2", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 2);
    buyToClose(stoArray, btcArray, stock, "date", 135, "P", 200, "date", 1);
    expect(stoArray[0].open).toBe(false);
    expect(stoArray[1].open).toBe(true);
    expect(btcArray[0].premium).toBe(200);
  });
  test("successfully closes 7 sto option and adds 7 btc option to array", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 7);
    buyToClose(stoArray, btcArray, stock, "date", 135, "P", 200, "date", 7);
    expect(stoArray[0].open).toBe(false);
    expect(stoArray[6].open).toBe(false);
    expect(btcArray[0].premium).toBe(200);
    expect(btcArray.length).toBe(7);
  });
  test("returns null when btc quantity is more than sto quantity, no btc are added to array", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    sellToOpen(stoArray, stock, "date", 135, "P", 400, "date", 6);
    const result = buyToClose(
      stoArray,
      btcArray,
      stock,
      "date",
      135,
      "P",
      200,
      "date",
      7
    );
    expect(stoArray[0].open).toBe(true);
    expect(stoArray[4].open).toBe(true);
    expect(btcArray.length).toBe(0);
    expect(result).toBe(null);
  });
  test("returns null when there are no matching sto options", () => {
    const stock: Stock = new Stock("AAPL");
    const stoArray: SellToOpen[] = [];
    const btcArray: BuyToClose[] = [];
    sellToOpen(stoArray, stock, "date", 130, "P", 400, "date", 7);
    const result = buyToClose(
      stoArray,
      btcArray,
      stock,
      "date",
      135,
      "P",
      200,
      "date",
      7
    );
    expect(stoArray[0].open).toBe(true);
    expect(stoArray[4].open).toBe(true);
    expect(btcArray.length).toBe(0);
    expect(result).toBe(null);
  });
});

describe("sellToClose function tests", () => {
  test("successfully closes 1 sto option and adds btc option to array", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 1);
    sellToClose(btoArray, stcArray, stock, "date", 135, "P", 200, "date", 1);
    expect(btoArray[0].open).toBe(false);
    expect(stcArray[0].premium).toBe(200);
  });
  test("successfully closes 1 sto option and adds btc option to array v2", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 2);
    sellToClose(btoArray, stcArray, stock, "date", 135, "P", 200, "date", 1);
    expect(btoArray[0].open).toBe(false);
    expect(btoArray[1].open).toBe(true);
    expect(stcArray[0].premium).toBe(200);
  });
  test("successfully closes 7 sto option and adds 7 btc option to array", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 7);
    sellToClose(btoArray, stcArray, stock, "date", 135, "P", 200, "date", 7);
    expect(btoArray[0].open).toBe(false);
    expect(btoArray[6].open).toBe(false);
    expect(stcArray[0].premium).toBe(200);
    expect(stcArray.length).toBe(7);
  });
  test("returns null when btc quantity is more than sto quantity, no btc are added to array", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    buyToOpen(btoArray, stock, "date", 135, "P", 400, "date", 6);
    const result = sellToClose(
      btoArray,
      stcArray,
      stock,
      "date",
      135,
      "P",
      200,
      "date",
      7
    );
    expect(btoArray[0].open).toBe(true);
    expect(btoArray[4].open).toBe(true);
    expect(stcArray.length).toBe(0);
    expect(result).toBe(null);
  });
  test("returns null when there are no matching sto options", () => {
    const stock: Stock = new Stock("AAPL");
    const btoArray: BuyToOpen[] = [];
    const stcArray: SellToClose[] = [];
    buyToOpen(btoArray, stock, "date", 130, "P", 400, "date", 7);
    const result = sellToClose(
      btoArray,
      stcArray,
      stock,
      "date",
      135,
      "P",
      200,
      "date",
      7
    );
    expect(btoArray[0].open).toBe(true);
    expect(btoArray[4].open).toBe(true);
    expect(stcArray.length).toBe(0);
    expect(result).toBe(null);
  });
});

describe("function tests", () => {
  test.todo("Placeholder");
});

describe("function tests", () => {
  test.todo("Placeholder");
});
