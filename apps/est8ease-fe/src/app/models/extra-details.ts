import { Property } from './property';

const extraDetailsMap: PropertyFeatures = {
  high_floor: { text: 'High Floor', icon: 'fa-building', score: 15 },
  chiller_free: { text: 'Chiller Free', icon: 'fa-snowflake', score: 15 },
  good_view: { text: 'Good View', icon: 'fa-eye', score: 20 },
  near_metro: { text: 'Near Metro', icon: 'fa-subway', score: 13 },
  corner_unit: { text: 'Corner Unit', icon: 'fa-th-large', score: 0 },
  recently_renovated: { text: 'Recently Renovated', icon: 'fa-paint-brush', score: 15 },
  big_terrace: { text: 'Big Terrace', icon: 'fa-umbrella', score: 2 },
  brand_new_unit: { text: 'Brand New Unit', icon: 'fa-star', score: 15 },
  easy_access_to_sheikh_zayed_road: {
    text: 'Easy Access to Sheikh Zayed Road',
    icon: 'fa-road',
    score: 5
  },
};
// 15 + 20 + 13 +15 =
interface PropertyFeatures {
  high_floor: ExtraDetail;
  chiller_free: ExtraDetail;
  good_view: ExtraDetail;
  near_metro: ExtraDetail;
  corner_unit: ExtraDetail;
  recently_renovated: ExtraDetail;
  big_terrace: ExtraDetail;
  brand_new_unit: ExtraDetail;
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
    if (score < 33) {
      return 'low';
    }
    if (score < 60) {
      return 'medium';
    }
    return 'high';
  }

  static getExtraDetail(key: string): ExtraDetail {
    return extraDetailsMap[key as keyof typeof extraDetailsMap];
  }
}
