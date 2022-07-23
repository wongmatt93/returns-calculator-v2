export default class Stock {
  ticker: string;
  quantity: number = 0;
  costBasis: number = 0;
  constructor(ticker: string) {
    this.ticker = ticker;
  }
  addShares(quantity: number): void {
    this.quantity += quantity;
  }
  subtractShares(quantity: number): void {
    this.quantity -= quantity;
  }
}
