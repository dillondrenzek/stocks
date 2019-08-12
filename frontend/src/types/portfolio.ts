export interface Portfolio {
  _id?: string;
  name: string;
}

const defaultValues: Portfolio = {
  name: ''
};

export class Portfolio {
  constructor(values: Partial<Portfolio> = defaultValues) {
    return Object.assign({}, defaultValues, values);
  }
}