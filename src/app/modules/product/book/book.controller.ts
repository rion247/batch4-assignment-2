import { Request, Response } from 'express';
import { BookService } from './book.service';
import bookValidationData from './bookValidationByZod';
import { ValidationErrorMap } from './book.interface';

const createAbook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookData = req.body;

    // validation by Zod
    const validBookData = bookValidationData.safeParse(bookData);

    if (!validBookData.success) {
      const errorDetails =
        validBookData.error.errors.reduce<ValidationErrorMap>((acc, err) => {
          const key = String(err.path[0]);
          acc[key] = {
            message: err.message,
            name: 'ValidatorError',
            properties: {
              message: err.message,
              type: 'min',
              min: 0,
            },
            kind: 'min',
            path: err.path,
            value: req.body[key],
          };
          return acc;
        }, {});

      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: errorDetails,
        },
        stack: new Error('Something went wrong').stack,
      });
      return;
    }

    const createBookData =
      await BookService.saveAbookDataIntoDatabase(bookData);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: createBookData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error,
      stack: new Error('Something went wrong').stack,
    });
  }
};

const getAllBooksData = async (req: Request, res: Response) => {
  try {
    const searchValue = req?.query?.searchTerm;
    const booksData = await BookService.getAllBooksDataFromDB(
      searchValue as string | undefined,
    );
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: booksData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

const getaBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId;

    const bookData = await BookService.getaBookFromDbs(bookId);

    res.status(200).json({
      message: 'Book retrieved successfully',
      status: true,
      data: bookData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

const upDateAbook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateddoc = req.body;

    const newBookDoc = await BookService.updateAbookFromDbs(id, updateddoc);

    res.status(200).json({
      message: 'Book updated successfully',
      status: true,
      data: newBookDoc,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

const deleteAbook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const newBookData = await BookService.deleteAbookFromDBS(id);
    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: newBookData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

export const BookController = {
  createAbook,
  getAllBooksData,
  getaBook,
  upDateAbook,
  deleteAbook,
};
