import { IAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

// let currentUserId = 0 // Initial user ID

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemister: IAcademicSemister | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemister?.year.substring(2)}${
    academicSemister?.code
  }${incrementedId}`;
  // console.log(incrementedId);

  return incrementedId;

  // currentUserId++;
  // return `user${currentUserId.toString().padStart(5, '0')}`;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
