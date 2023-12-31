import { Types, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';
import { Schema } from 'mongoose';

export const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      uniqure: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },

    academicFaculty: {
      type: Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    }, // reference _id
    academicDepartment: {
      type: Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
