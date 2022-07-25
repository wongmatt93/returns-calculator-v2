import BuyToClose from "./BuyToClose";
import BuyToOpen from "./BuyToOpen";
import Dividend from "./Dividend";
import SellToClose from "./SellToClose";
import SellToOpen from "./SellToOpen";

export default class Stock {
  ticker: string;
  quantity: number = 0;
  costBasis: number = 0;
  constructor(ticker: string) {
    this.ticker = ticker;
  }
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
  }
  updateCostBasis(costBasis: number): void {
    this.costBasis = costBasis;
  }
  addDividend(dividendArray: Dividend[], amount: number, date: string) {
    const newDividend = new Dividend(this.ticker, amount, date);
    dividendArray.push(newDividend);
  }
  buyToOpen(
    btoArray: BuyToOpen[],
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ): void {
    const newOption: BuyToOpen = new BuyToOpen(
      this.ticker,
      transactionDate,
      strike,
      callPut,
      premium,
      expiration
    );
    btoArray.push(newOption);
  }
  sellToOpen(
    stoArray: SellToOpen[],
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ): void {
    const newOption: SellToOpen = new SellToOpen(
      this.ticker,
      transactionDate,
      strike,
      callPut,
      premium,
      expiration
    );
    stoArray.push(newOption);
  }
  buyToClose(
    stoArray: SellToOpen[],
    btcArray: BuyToClose[],
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ): void | string {
    const findOption: SellToOpen | undefined = stoArray.find(
      (option) =>
        option.ticker == this.ticker &&
        option.strike == strike &&
        option.callPut == callPut &&
        option.expiration == expiration &&
        option.open == true
    );
    if (findOption) {
      const newOption: BuyToClose = new BuyToClose(
        this.ticker,
        transactionDate,
        strike,
        callPut,
        premium,
        expiration
      );
      newOption.closeOption(findOption);
      btcArray.push(newOption);
    } else {
      return "No option position to close";
    }
  }
  sellToClose(
    btoArray: BuyToOpen[],
    stcArray: SellToClose[],
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ): void | string {
    const findOption: BuyToOpen | undefined = btoArray.find(
      (option) =>
        option.ticker == this.ticker &&
        option.strike == strike &&
        option.callPut == callPut &&
        option.expiration == expiration &&
        option.open == true
    );
    if (findOption) {
      const newOption: SellToClose = new SellToClose(
        this.ticker,
        transactionDate,
        strike,
        callPut,
        premium,
        expiration
      );
      newOption.closeOption(findOption);
      stcArray.push(newOption);
    } else {
      return "No option position to close";
    }
  }
}
