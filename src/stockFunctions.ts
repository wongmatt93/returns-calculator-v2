import BuyToClose from "./BuyToClose";
import BuyToOpen from "./BuyToOpen";
import Dividend from "./Dividend";
import SellToClose from "./SellToClose";
import SellToOpen from "./SellToOpen";
import Stock from "./Stock";

const addStock = (ticker: string, stockArray: Stock[]): void | null => {
  if (!stockArray.find((stock) => stock.ticker == ticker)) {
    stockArray.push(new Stock(ticker));
  } else {
    return null;
  }
};

const updateStockQuantity = (stock: Stock, quantity: number): void => {
  stock.updateQuantity(quantity);
};

const updateCostBasis = (stock: Stock, costBasis: number): void => {
  stock.updateCostBasis(costBasis);
};

const addDividend = (
  dividendArray: Dividend[],
  stock: Stock,
  amount: number,
  date: string
): void => {
  stock.addDividend(dividendArray, amount, date);
};

const buyToOpen = (
  btoArray: BuyToOpen[],
  stock: Stock,
  transactionDate: string,
  strike: number,
  callPut: string,
  premium: number,
  expiration: string,
  quantity: number
) => {
  for (let i: number = 0; i < quantity; i++) {
    stock.buyToOpen(
      btoArray,
      transactionDate,
      strike,
      callPut,
      premium,
      expiration
    );
  }
};

const sellToOpen = (
  stoArray: SellToOpen[],
  stock: Stock,
  transactionDate: string,
  strike: number,
  callPut: string,
  premium: number,
  expiration: string,
  quantity: number
): void => {
  for (let i: number = 0; i < quantity; i++) {
    stock.sellToOpen(
      stoArray,
      transactionDate,
      strike,
      callPut,
      premium,
      expiration
    );
  }
};

const buyToClose = (
  stoArray: SellToOpen[],
  btcArray: BuyToClose[],
  stock: Stock,
  transactionDate: string,
  strike: number,
  callPut: string,
  premium: number,
  expiration: string,
  quantity: number
): void | null => {
  const filteredOptions: SellToOpen[] = stoArray.filter(
    (option) =>
      option.ticker == stock.ticker &&
      option.strike == strike &&
      option.callPut == callPut &&
      option.expiration == expiration
  );
  if (quantity <= filteredOptions.length) {
    for (let i: number = 0; i < quantity; i++) {
      stock.buyToClose(
        filteredOptions,
        btcArray,
        transactionDate,
        strike,
        callPut,
        premium,
        expiration
      );
    }
  } else {
    return null;
  }
};

const sellToClose = (
  btoArray: BuyToOpen[],
  stcArray: SellToClose[],
  stock: Stock,
  transactionDate: string,
  strike: number,
  callPut: string,
  premium: number,
  expiration: string,
  quantity: number
): void | null => {
  const filteredOptions: BuyToOpen[] = btoArray.filter(
    (option) =>
      option.ticker == stock.ticker &&
      option.strike == strike &&
      option.callPut == callPut &&
      option.expiration == expiration
  );
  if (quantity <= filteredOptions.length) {
    for (let i: number = 0; i < quantity; i++) {
      stock.sellToClose(
        filteredOptions,
        stcArray,
        transactionDate,
        strike,
        callPut,
        premium,
        expiration
      );
    }
  } else {
    return null;
  }
};

export {
  addStock,
  updateStockQuantity,
  updateCostBasis,
  addDividend,
  buyToOpen,
  sellToOpen,
  buyToClose,
  sellToClose,
};
