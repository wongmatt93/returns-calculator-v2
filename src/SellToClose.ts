import Option from "./models/Option";
import BuyToOpen from "./BuyToOpen";

export default class SellToClose implements Option {
  ticker: string;
  transactionDate: string;
  strike: number;
  callPut: string;
  premium: number;
  expiration: string;
  constructor(
    ticker: string,
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ) {
    {
      this.ticker = ticker;
      this.transactionDate = transactionDate;
      this.strike = strike;
      this.callPut = callPut;
      this.premium = premium;
      this.expiration = expiration;
    }
  }
  closeOption(openOption: BuyToOpen): void {
    openOption.open = false;
  }
}
