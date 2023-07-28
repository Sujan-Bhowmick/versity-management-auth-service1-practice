"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const academicFaculty_model_1 = require("./academicFaculty.model");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
});
const getAllFaculty = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: academicFaculty_constant_1.academicFacultySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicFaculty_model_1.AcademicFaculty.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicFaculty_model_1.AcademicFaculty.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// const getAllFaculty = async (
//   paginationOptions: IPaginationOptions,
//   filters: IAcademicFacultyFilters
// ): Promise<IGenericResponse<IAcademicFaculty[]>> => {
//   // const { limit = 10, page = 1 } = paginationOptions;
//   // const skip = (page - 1) * limit;
//   const { page, limit, sortOrder, sortBy, skip } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const { searchTerm, ...filtersData } = filters;
//   const andConditions = [];
//   if (searchTerm) {
//     andConditions.push({
//       $or: academicFacultySearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const whereCondtions =
//     andConditions.length > 0 ? { $and: andConditions } : {};
//   const result = AcademicFaculty.find(whereCondtions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);
//   const total = await AcademicFaculty.countDocuments();
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    return result;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndDelete(id);
    return result;
});
exports.AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
