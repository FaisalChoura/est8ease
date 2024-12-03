import { Property } from '../models/property';

const extraDetailsMap: PropertyFeatures = {
  high_floor: { text: 'High Floor', icon: 'fa-building' },
  chiller_free: { text: 'Chiller Free', icon: 'fa-snowflake' },
  good_view: { text: 'Good View', icon: 'fa-eye' },
  near_metro: { text: 'Near Metro', icon: 'fa-subway' },
  corner_unit: { text: 'Corner Unit', icon: 'fa-th-large' },
  recently_renovated: { text: 'Recently Renovated', icon: 'fa-paint-brush' },
  big_terrace: { text: 'Big Terrace', icon: 'fa-umbrella' },
  brand_new_unit: { text: 'Brand New Unit', icon: 'fa-star' },
  easy_access_to_sheikh_zayed_road: {
    text: 'Easy Access to Sheikh Zayed Road',
    icon: 'fa-road',
  },
};

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

interface ExtraDetail {
  text: string;
  icon: string;
}

export class ExtraDetails {
  static userFriendlyExtraDetails(property: Property): ExtraDetail[] {
    return Object.entries(property.extraDetails)
      .filter(([key, value]) => value)
      .map(([key]) => extraDetailsMap[key as keyof typeof extraDetailsMap]);
  }
}
