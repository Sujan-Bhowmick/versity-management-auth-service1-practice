/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  // console.log(searchTerm);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondtions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereCondtions)
    .populate('academicSemister')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondtions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemister')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

// ensure 2: Service Level: Update --> Mapping title : code
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  /* const name = {
    firstName: "Mezba", <---- update korar jonno
    lastName: 'Persian
  }
  */

  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; //`name.firstName` `name.lastName`

      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`; //`name.firstName` `name.lastName`

      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`; //`localGuardian.firstlocalGuardian` `localGuardian.lastlocalGuardian`

      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);

  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
