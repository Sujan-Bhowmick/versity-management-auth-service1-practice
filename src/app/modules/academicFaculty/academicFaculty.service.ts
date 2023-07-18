import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = AcademicFaculty.create(payload);

  return result;
};
const getAllFaculty = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { limit = 10, page = 1 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = AcademicFaculty.find().sort().skip(skip).limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
};
