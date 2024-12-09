import { Property } from './property';

export class Properties {
  list: Property[]; // List of properties
  count: number; // Total number of properties
  avgCostPerSqm = 0;

  constructor(properties: Property[], count = 0, avgCostPerSqm = 0) {
    this.list = properties;
    this.count = count;
    this.avgCostPerSqm = avgCostPerSqm;
  }

  append(list: Property[]): void {
    this.list = [...this.list, ...list];
  }
}
