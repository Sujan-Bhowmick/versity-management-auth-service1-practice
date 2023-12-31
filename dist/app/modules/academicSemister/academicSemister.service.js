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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemisterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemister_constant_1 = require("./academicSemister.constant");
const academicSemisterModel_1 = require("./academicSemisterModel");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createSemister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemister_constant_1.academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semister Code');
    }
    const result = yield academicSemisterModel_1.AcademicSemister.create(payload);
    return result;
});
const getAllSemister = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    // console.log(searchTerm);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicSemister_constant_1.academicSemisterSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondtions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicSemisterModel_1.AcademicSemister.find(whereCondtions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemisterModel_1.AcademicSemister.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSemister = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemisterModel_1.AcademicSemister.findById(id);
    return result;
});
// ensure 2: Service Level: Update --> Mapping title : code
const updateSemister = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.title &&
        payload.code &&
        academicSemister_constant_1.academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid semister code');
    }
    const result = academicSemisterModel_1.AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSemister = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemisterModel_1.AcademicSemister.findByIdAndDelete(id);
    return result;
});
exports.AcademicSemisterService = {
    createSemister,
    getAllSemister,
    getSingleSemister,
    updateSemister,
    deleteSemister,
};
