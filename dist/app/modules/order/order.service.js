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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const saveOrderIntoDb = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.create(value);
    return result;
});
const calculateRevenueFromOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield order_model_1.OrderModel.aggregate([
        {
            $lookup: {
                from: 'books', // The 'books' collection
                let: { productId: { $toObjectId: '$product' } }, // Convert product to ObjectId
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$productId'] }, // Match the productId with _id in books
                        },
                    },
                ],
                as: 'bookDetails', // Alias for the joined book details
            },
        },
        {
            $unwind: '$bookDetails',
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: { $multiply: ['$quantity', '$bookDetails.price'] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return revenue;
});
exports.OrderService = {
    saveOrderIntoDb,
    calculateRevenueFromOrder,
};
