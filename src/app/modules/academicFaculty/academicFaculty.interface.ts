import { Model } from 'mongoose';

export type IAcademicFacultyTitle =
  | 'Science and Engineering'
  | 'Business Administration'
  | 'Arts and Social Science';

export type IAcademicFaculty = {
  title: IAcademicFacultyTitle;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = { searchTerm?: string };
