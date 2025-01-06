import { Property } from './property';

const extraDetailsMap: PropertyFeatures = {
  high_floor: { text: 'High Floor', icon: 'fa-building', score: 15 },
  chiller_free: { text: 'Chiller Free', icon: 'fa-snowflake', score: 15 },
  good_view: { text: 'Good View', icon: 'fa-eye', score: 20 },
  near_public_transport: { text: 'Near Metro', icon: 'fa-subway', score: 15 },
  corner_unit: { text: 'Corner Unit', icon: 'fa-th-large', score: 5 },
  big_terrace: { text: 'Big Terrace', icon: 'fa-umbrella', score: 5 },
  brand_new_or_renovated: { text: 'Brand New / Renovated', icon: 'fa-star', score: 15 },
  easy_access_to_sheikh_zayed_road: {
    text: 'Easy Access to Sheikh Zayed Road',
    icon: 'fa-road',
    score: 10
  },
};
// sum all the
interface PropertyFeatures {
  high_floor: ExtraDetail;
  chiller_free: ExtraDetail;
  good_view: ExtraDetail;
  near_public_transport: ExtraDetail;
  corner_unit: ExtraDetail;
  big_terrace: ExtraDetail;
  brand_new_or_renovated: ExtraDetail;
  easy_access_to_sheikh_zayed_road: ExtraDetail;
}

export interface ExtraDetail {
  text: string;
  icon: string;
  score: number;
}

export class ExtraDetails {
  static userFriendlyExtraDetails(property: Property): ExtraDetail[] {
    return Object.entries(property.extraDetails)
      .filter(([key, value]) => value)
      .map(([key]) => extraDetailsMap[key as keyof typeof extraDetailsMap]);
  }

  static getScore(property: Property): number {
    return ExtraDetails.userFriendlyExtraDetails(property).reduce(
      (acc, curr) => acc + curr.score,
      0
    );
  }

  static scoreLevel(score: number) {
    if (score < 25) {
      return 'low';
    }
    if (score < 75) {
      return 'medium';
    }
    return 'high';
  }

  static getExtraDetail(key: string): ExtraDetail {
    return extraDetailsMap[key as keyof typeof extraDetailsMap];
  }
}
