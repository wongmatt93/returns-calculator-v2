export default class Dividend {
  ticker: string;
  amount: number;
  date: string;
  constructor(ticker: string, amount: number, date: string) {
    this.ticker = ticker;
    this.amount = amount;
    this.date = date;
  }
}
