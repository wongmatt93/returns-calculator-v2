import Option from "./models/Option";
import Dividend from "./Dividend";

const grandTotalPremium = (optionsArray: Option[]): number =>
  optionsArray.reduce(
    (pv, cv) =>
      cv.constructor.name.includes("Buy") ? pv - cv.premium : pv + cv.premium,
    0
  );

const findOptionsForTicker = (
  optionsArray: Option[],
  ticker: string
): Option[] => optionsArray.filter((option) => option.ticker == ticker);

const totalPremiumForTicker = (
  optionsArray: Option[],
  ticker: string
): number => grandTotalPremium(findOptionsForTicker(optionsArray, ticker));

const grandTotalDividends = (dividendArray: Dividend[]): number =>
  dividendArray.reduce((pv, cv) => pv + cv.amount, 0);

const findDividendsForTicker = (
  dividendArray: Dividend[],
  ticker: string
): Dividend[] => dividendArray.filter((dividend) => dividend.ticker == ticker);

const totalDividendsForTicker = (
  dividendArray: Dividend[],
  ticker: string
): number => grandTotalDividends(findDividendsForTicker(dividendArray, ticker));

const totalReturnForTicker = (
  optionArray: Option[],
  dividendArray: Dividend[],
  ticker: string
): number =>
  totalPremiumForTicker(optionArray, ticker) +
  totalDividendsForTicker(dividendArray, ticker);

const grandTotal = (optionArray: Option[], dividendArray: Dividend[]): number =>
  grandTotalPremium(optionArray) + grandTotalDividends(dividendArray);

export {
  findOptionsForTicker,
  totalPremiumForTicker,
  findDividendsForTicker,
  totalDividendsForTicker,
  grandTotalPremium,
  grandTotalDividends,
  totalReturnForTicker,
  grandTotal,
};
