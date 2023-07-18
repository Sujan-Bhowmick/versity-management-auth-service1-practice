import { Model } from 'mongoose';

export type IAcademicSemisterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemisterTitle = 'Autum' | 'Summer' | 'Fall';
export type IAcademicSemisterCode = '01' | '02' | '03';

export type IAcademicSemister = {
  title: IAcademicSemisterTitle;
  year: string;
  code: IAcademicSemisterCode;
  startMonth: IAcademicSemisterMonth;
  endMonth: IAcademicSemisterMonth;
};

export type IAcademicSemisterModel = Model<IAcademicSemister>;

export type IAcademicSemisterFilters = { searchTerm?: string };
