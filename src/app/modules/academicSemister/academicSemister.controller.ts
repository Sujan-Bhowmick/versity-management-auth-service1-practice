import { Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { IAcademicSemister } from './academicSemister.interface';
import { academicSemisterFilteratbleFields } from './academicSemister.constant';

const createSemister = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister Created Successfully',
    data: result,
  });
});

const getAllSemister = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemisterFilteratbleFields);
  console.log(filters);

  const paginationOptions = pick(req.query, paginationFields);

  // console.log(req.query)

  const result = await AcademicSemisterService.getAllSemister(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semisters retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemisterService.getSingleSemister(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister retrieved successfully',
    data: result,
  });
});

const updateSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = AcademicSemisterService.updateSemister(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister updated Successfully',
    data: result,
  });
});

const deleteSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = AcademicSemisterService.deleteSemister(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister deleted Successfully',
    data: result,
  });
});

export const AcademicSemisterController = {
  createSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
