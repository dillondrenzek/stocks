import {PageType} from './types/pdf';

export function parsePageType(text: string): PageType {
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

// export function isPageType(text: string): 