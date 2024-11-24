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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const saveAbookDataIntoDatabase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.BookModel.create(data);
    return result;
});
const getAllBooksDataFromDB = (value) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (value) {
        query = {
            $or: [
                { title: { $regex: new RegExp(`^${value}$`, 'i') } },
                { author: { $regex: new RegExp(`^${value}$`, 'i') } },
                { category: { $regex: new RegExp(`^${value}$`, 'i') } },
            ],
        };
    }
    const result = yield book_model_1.BookModel.find(query);
    return result;
});
const getaBookFromDbs = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.BookModel.findById(value);
    return result;
});
const updateAbookFromDbs = (id, doc) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.BookModel.findByIdAndUpdate(id, doc, { new: true });
    return result;
});
const deleteAbookFromDBS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.BookModel.findByIdAndDelete(id, { new: true });
    return result;
});
exports.BookService = {
    saveAbookDataIntoDatabase,
    getAllBooksDataFromDB,
    getaBookFromDbs,
    updateAbookFromDbs,
    deleteAbookFromDBS,
};
