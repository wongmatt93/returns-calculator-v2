import Option from "./models/Option";

export default class SellToOpen implements Option {
  ticker: string;
  transactionDate: string;
  strike: number;
  callPut: string;
  premium: number;
  expiration: string;
  open: boolean = true;
  constructor(
    ticker: string,
    transactionDate: string,
    strike: number,
    callPut: string,
    premium: number,
    expiration: string
  ) {
    this.ticker = ticker;
    this.transactionDate = transactionDate;
    this.strike = strike;
    this.callPut = callPut;
    this.premium = premium;
    this.expiration = expiration;
  }
  closeOption(): void {
    this.open = false;
  }
}
