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
exports.OrderController = void 0;
const book_model_1 = require("../product/book/book.model");
const order_service_1 = require("./order.service");
const orderValidationByZod_1 = __importDefault(require("./orderValidationByZod"));
const orderAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        //zod validation
        const validOrderData = orderValidationByZod_1.default.parse(orderData);
        const productData = yield book_model_1.BookModel.findById(orderData.product);
        if (!productData) {
            // throw new Error('Product not Found!');
            res.status(404).json({
                message: 'Book not found!',
                success: false,
            });
            return;
        }
        if (productData.quantity < validOrderData.quantity) {
            throw new Error('Insufficient stock!');
        }
        if (productData.inStock === false) {
            throw new Error('Insufficient stock!');
        }
        productData.quantity = productData.quantity - validOrderData.quantity;
        if (productData.quantity <= 0) {
            productData.inStock = false;
        }
        const saveOrder = yield order_service_1.OrderService.saveOrderIntoDb(validOrderData);
        const updateBookData = yield productData.save();
        res.json({
            message: 'Order created successfully',
            status: true,
            updateBookData,
            data: saveOrder,
        });
    }
    catch (error) {
        res.json({
            message: 'Something went wrong!',
            status: false,
            error,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.calculateRevenueFromOrder();
        res.json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: 'Something went wrong!',
            status: false,
            error,
        });
    }
});
exports.OrderController = { orderAbook, calculateRevenue };
