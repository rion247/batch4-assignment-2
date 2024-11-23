import { QueryType, TBook } from './book.interface';
import { BookModel } from './book.model';

const saveAbookDataIntoDatabase = async (data: TBook) => {
  const result = await BookModel.create(data);
  return result;
};

const getAllBooksDataFromDB = async (value: string | undefined) => {
  let query: QueryType = {};

  if (value) {
    query = {
      $or: [
        { title: { $regex: new RegExp(`^${value}$`, 'i') } },
        { author: { $regex: new RegExp(`^${value}$`, 'i') } },
        { category: { $regex: new RegExp(`^${value}$`, 'i') } },
      ],
    };
  }

  const result = await BookModel.find(query);
  return result;
};

const getaBookFromDbs = async (value: string) => {
  const result = await BookModel.findById(value);
  return result;
};

const updateAbookFromDbs = async (id: string, doc: Partial<TBook>) => {
  const result = await BookModel.findByIdAndUpdate(id, doc, { new: true });
  return result;
};

const deleteAbookFromDBS = async (id: string) => {
  const result = await BookModel.findByIdAndDelete(id, { new: true });
  return result;
};

export const BookService = {
  saveAbookDataIntoDatabase,
  getAllBooksDataFromDB,
  getaBookFromDbs,
  updateAbookFromDbs,
  deleteAbookFromDBS,
};
