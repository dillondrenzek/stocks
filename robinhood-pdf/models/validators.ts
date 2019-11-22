import {PageType} from '../pdf/types';

export function getPageType(text: string): PageType {
  if (text.indexOf(PageType.AccountActivity) !== -1) {
    return PageType.AccountActivity;
  } else if (text.indexOf(PageType.PortfolioSummary) !== -1) {
    return PageType.PortfolioSummary
  } else if (text.indexOf(PageType.Unknown) !== -1) {
    return PageType.Unknown;
  } else {
    return null;
  }
}
