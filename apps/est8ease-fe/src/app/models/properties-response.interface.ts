import { Property } from './property';
// TODO merge with BE
export interface PropertiesResponseInterface {
  data: Property[];
  total: number;
  page: number;
  limit: number;
  avgCostPerSqm: number
}
