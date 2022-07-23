import BuyToClose from "../src/BuyToClose";
import BuyToOpen from "../src/BuyToOpen";
import Dividend from "../src/Dividend";
import {
  findOptionsForTicker,
  findDividendsForTicker,
  grandTotalDividends,
  grandTotalPremium,
  totalPremiumForTicker,
  totalDividendsForTicker,
  totalReturnForTicker,
  grandTotal,
} from "../src/arithmeticFunctions";
import Option from "../src/models/Option";
import SellToClose from "../src/SellToClose";
import SellToOpen from "../src/SellToOpen";

describe("findOptionsForTicker function tests", () => {
  test("provided options array of 1 of each option type match, return new array of all", () => {
    const sto: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 400, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(findOptionsForTicker(optionsArray, ticker)).toEqual([
      sto,
      stc,
      btc,
      bto,
    ]);
  });
  test("provided options array with different tickers, return new array of only filtered", () => {
    const sto: SellToOpen = new SellToOpen(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 400, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(findOptionsForTicker(optionsArray, ticker)).toEqual([stc, bto]);
  });
  test("no match yields empty array", () => {
    const sto: SellToOpen = new SellToOpen("T", "date", 135, "P", 400, "date");
    const stc: SellToClose = new SellToClose(
      "C",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("INTC", "date", 135, "P", 400, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(findOptionsForTicker(optionsArray, ticker)).toEqual([]);
  });
  test("empty array yields empty array", () => {
    const optionsArray: Option[] = [];
    const ticker = "AAPL";
    expect(findOptionsForTicker(optionsArray, ticker)).toEqual([]);
  });
});

describe("totalPremiumsForTicker function tests", () => {
  test("add premiums appropriately for stocks of correct ticker", () => {
    const sto: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose(
      "AAPL",
      "date",
      135,
      "P",
      200,
      "date"
    );
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(totalPremiumForTicker(optionsArray, ticker)).toBe(400);
  });
  test("provided options array with different tickers, return total premium of only provided ticker", () => {
    const sto: SellToOpen = new SellToOpen(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(totalPremiumForTicker(optionsArray, ticker)).toBe(200);
  });
  test("no match yields 0", () => {
    const sto: SellToOpen = new SellToOpen("T", "date", 135, "P", 400, "date");
    const stc: SellToClose = new SellToClose(
      "C",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("INTC", "date", 135, "P", 400, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const ticker = "AAPL";
    expect(totalPremiumForTicker(optionsArray, ticker)).toBe(0);
  });
  test("empty array yields 0", () => {
    const optionsArray: Option[] = [];
    const ticker = "AAPL";
    expect(totalPremiumForTicker(optionsArray, ticker)).toBe(0);
  });
});

describe("grandTotalPremium function tests", () => {
  test("provided options array with different tickers, return total premium of all tickers", () => {
    const sto: SellToOpen = new SellToOpen(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    expect(grandTotalPremium(optionsArray)).toBe(200);
  });
  test("empty array yields 0", () => {
    const optionsArray: Option[] = [];
    expect(grandTotalPremium(optionsArray)).toBe(0);
  });
});

describe("findDividendForTicker function tests", () => {
  test("given array of 4 dividends of same ticker, provide new array with all 4", () => {
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("AAPL", 100, "date");
    const div3: Dividend = new Dividend("AAPL", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(findDividendsForTicker(divArray, ticker)).toEqual([
      div1,
      div2,
      div3,
      div4,
    ]);
  });
  test("given array of 4 dividends of different tickers, provide new array with only AAPL", () => {
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(findDividendsForTicker(divArray, ticker)).toEqual([div1, div4]);
  });
  test("given array of 4 dividends of no match, provide empty", () => {
    const div1: Dividend = new Dividend("T", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("INTC", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(findDividendsForTicker(divArray, ticker)).toEqual([]);
  });
  test("given empty array, provide empty", () => {
    const divArray: Dividend[] = [];
    const ticker: string = "AAPL";
    expect(findDividendsForTicker(divArray, ticker)).toEqual([]);
  });
});

describe("totalDividendForTicker function tests", () => {
  test("given array of 4 dividends of same ticker, get correct total", () => {
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("AAPL", 100, "date");
    const div3: Dividend = new Dividend("AAPL", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalDividendsForTicker(divArray, ticker)).toBe(400);
  });
  test("given array of 4 dividends of different tickers, get correct total", () => {
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalDividendsForTicker(divArray, ticker)).toBe(200);
  });
  test("given array of 4 dividends of no matches, get correct total", () => {
    const div1: Dividend = new Dividend("T", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("INTC", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalDividendsForTicker(divArray, ticker)).toBe(0);
  });
  test("given empty array, get 0", () => {
    const divArray: Dividend[] = [];
    const ticker: string = "AAPL";
    expect(totalDividendsForTicker(divArray, ticker)).toBe(0);
  });
});

describe("grandTotalDividend function tests", () => {
  test("given array of 4 dividends of different tickers, add all together", () => {
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    expect(grandTotalDividends(divArray)).toBe(400);
  });
  test("given empty array, get 0", () => {
    const divArray: Dividend[] = [];
    expect(grandTotalDividends(divArray)).toBe(0);
  });
});

describe("totalReturnForTicker function tests", () => {
  test("given arrays of dividends and options for one ticker, produce correct total", () => {
    const sto: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose(
      "AAPL",
      "date",
      135,
      "P",
      200,
      "date"
    );
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("AAPL", 100, "date");
    const div3: Dividend = new Dividend("AAPL", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalReturnForTicker(optionsArray, divArray, ticker)).toBe(800);
  });
  test("given arrays of dividends and options for several ticker, produce correct total", () => {
    const sto: SellToOpen = new SellToOpen(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 200, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalReturnForTicker(optionsArray, divArray, ticker)).toBe(400);
  });
  test("given arrays of dividends and options for non matching ticker, produce 0", () => {
    const sto: SellToOpen = new SellToOpen("T", "date", 135, "P", 400, "date");
    const stc: SellToClose = new SellToClose(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 200, "date");
    const bto: BuyToOpen = new BuyToOpen("INTC", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const div1: Dividend = new Dividend("T", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("INTC", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    const ticker: string = "AAPL";
    expect(totalReturnForTicker(optionsArray, divArray, ticker)).toBe(0);
  });
  test("given empty array, produce 0", () => {
    const optionsArray: Option[] = [];
    const divArray: Dividend[] = [];
    const ticker: string = "AAPL";
    expect(totalReturnForTicker(optionsArray, divArray, ticker)).toBe(0);
  });
});

describe("grandTotal function tests", () => {
  test("given an options and dividends array, get grand total", () => {
    const sto: SellToOpen = new SellToOpen(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    expect(grandTotal(optionsArray, divArray)).toBe(600);
  });
  test("given an options and empty dividends array, get grand total", () => {
    const sto: SellToOpen = new SellToOpen(
      "BAC",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const stc: SellToClose = new SellToClose(
      "AAPL",
      "date",
      135,
      "P",
      400,
      "date"
    );
    const btc: BuyToClose = new BuyToClose("C", "date", 135, "P", 400, "date");
    const bto: BuyToOpen = new BuyToOpen("AAPL", "date", 135, "P", 200, "date");
    const optionsArray: Option[] = [sto, stc, btc, bto];
    const divArray: Dividend[] = [];
    expect(grandTotal(optionsArray, divArray)).toBe(200);
  });
  test("given an empty options array and dividends array, get grand total", () => {
    const optionsArray: Option[] = [];
    const div1: Dividend = new Dividend("AAPL", 100, "date");
    const div2: Dividend = new Dividend("BAC", 100, "date");
    const div3: Dividend = new Dividend("C", 100, "date");
    const div4: Dividend = new Dividend("AAPL", 100, "date");
    const divArray: Dividend[] = [div1, div2, div3, div4];
    expect(grandTotal(optionsArray, divArray)).toBe(400);
  });
  test("given two empty arrays, return 0", () => {
    const optionsArray: Option[] = [];
    const divArray: Dividend[] = [];
    expect(grandTotal(optionsArray, divArray)).toBe(0);
  });
});
