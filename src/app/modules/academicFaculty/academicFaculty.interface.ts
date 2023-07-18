import { Model } from 'mongoose';

export type IAcademicFacultyTitle =
  | 'Science and Engineering'
  | 'Business Administration'
  | 'Arts and Social Science';
export type IAcademicFaculty = {
  title: IAcademicFacultyTitle;
};

export type AcademicFacultyModel = Model<IAcademicFaculty>;
