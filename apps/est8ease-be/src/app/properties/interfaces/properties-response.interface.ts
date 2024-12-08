import { Property } from './property.interfacet';
// TODO merge with FE
export interface PropertiesResponseInterface {
  data: Property[];
  total: number;
  page: number;
  limit: number;
  avgCostPerSqm: number
}
