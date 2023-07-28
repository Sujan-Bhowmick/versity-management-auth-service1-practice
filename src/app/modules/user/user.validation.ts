import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        MiddleName: z.string().optional(),
        lastName: z.string({
          required_error: 'First Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact No is required',
      }),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      academicSemister: z.string({
        required_error: 'Academic Semister is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact no is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: ' Name is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact no is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        MiddleName: z.string().optional(),
        lastName: z.string({
          required_error: 'First Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact No is required',
      }),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      designation: z.string({
        required_error: 'Designation is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};
