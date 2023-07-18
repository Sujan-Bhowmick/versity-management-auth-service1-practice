import { Schema, model } from 'mongoose';
import { IAcademicSemister } from './academicSemister.interface';
import {
  academicSemisterCode,
  academicSemisterMonth,
  academicSemisterTitle,
} from './academicSemister.constant';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonth,
    },
  },
  {
    timestamps: true,
  }
);

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semister is already exist');
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema
);

// handling same year and same semister issue

// Data -> check -? same year && same semister
