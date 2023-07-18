import {
  IAcademicSemisterCode,
  IAcademicSemisterMonth,
  IAcademicSemisterTitle,
} from './academicSemister.interface';

export const academicSemisterCode: IAcademicSemisterCode[] = ['01', '02', '03'];

export const academicSemisterTitle: IAcademicSemisterTitle[] = [
  'Autum',
  'Summer',
  'Fall',
];

export const academicSemisterMonth: IAcademicSemisterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autum: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemisterSearchableFields = ['title', 'code', 'year'];

export const academicSemisterFilteratbleFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
