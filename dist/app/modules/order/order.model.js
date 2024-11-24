"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email Field is required!'],
    },
    product: { type: String, required: [true, 'Product Field is required!'] },
    quantity: { type: Number, required: [true, 'Quantity Field is required!'] },
    totalPrice: { type: Number, required: true },
});
exports.OrderModel = mongoose_2.default.model('Order', orderSchema);
