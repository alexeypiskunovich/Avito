
export interface BaseDataItem {
  [key: string]: string | number | undefined;
}

export interface FormattedActivityItem extends BaseDataItem {
  date: string;
  day: string;
  approved: number;
  rejected: number;
  requestChanges: number;
  total: number;
}

export interface PieDataItem extends BaseDataItem {
  name: string;
  value: number;
  percent?: number;
}

export interface CategoryDataItem extends BaseDataItem {
  category: string;
  count: number;
}