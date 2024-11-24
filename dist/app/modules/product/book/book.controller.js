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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const bookValidationByZod_1 = __importDefault(require("./bookValidationByZod"));
const createAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        // validation by Zod
        const validBookData = bookValidationByZod_1.default.parse(bookData);
        const createBookData = yield book_service_1.BookService.saveAbookDataIntoDatabase(validBookData);
        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: createBookData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
            stack: new Error('Something went wrong').stack,
        });
    }
});
const getAllBooksData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchValue = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const booksData = yield book_service_1.BookService.getAllBooksDataFromDB(searchValue);
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: booksData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
        });
    }
});
const getaBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.productId;
        const bookData = yield book_service_1.BookService.getaBookFromDbs(bookId);
        res.status(200).json({
            message: 'Book retrieved successfully',
            status: true,
            data: bookData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
        });
    }
});
const upDateAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updateddoc = req.body;
        const newBookDoc = yield book_service_1.BookService.updateAbookFromDbs(id, updateddoc);
        res.status(200).json({
            message: 'Book updated successfully',
            status: true,
            data: newBookDoc,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
        });
    }
});
const deleteAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const newBookData = yield book_service_1.BookService.deleteAbookFromDBS(id);
        res.status(200).json({
            message: 'Book deleted successfully',
            success: true,
            data: newBookData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
        });
    }
});
exports.BookController = {
    createAbook,
    getAllBooksData,
    getaBook,
    upDateAbook,
    deleteAbook,
};
