import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemisterSearchableFields,
  academicSemisterTitleCodeMapper,
} from './academicSemister.constant';
import {
  IAcademicSemister,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemisterModel';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemister = async (
  filters: IAcademicSemisterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log(searchTerm);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemisterSearchableFields.map(field => ({
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
  // const andConditions =[
  // {
  //   $or: [
  //   {
  //     title:{
  //     $regex: searchTerm,
  //     $options: 'i',
  //   },
  //   },
  //   {
  //     code:{
  //     $regex: searchTerm,
  //     $options: 'i',
  //   },
  //   },
  //   {
  //     year:{
  //     $regex: searchTerm,
  //     $options: 'i',
  //   },
  //   }
  //  ],
  // },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondtions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemister.find(whereCondtions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);

  return result;
};

// ensure 2: Service Level: Update --> Mapping title : code
const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semister code');
  }

  const result = AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);

  return result;
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
