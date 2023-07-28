import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const updateFacultyZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string().optional(),
          MiddleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z.string().email().optional(),
      emergencyContactNo: z.string().optional(),
      contactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
      profileImage: z.string().optional(),
    })
    .optional(),
});

export const facultyValidation = {
  updateFacultyZodSchema,
};
