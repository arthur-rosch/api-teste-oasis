"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
function generateToken(user) {
    return (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
}
function verifyToken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
    }
    catch (_a) {
        throw new apollo_server_express_1.AuthenticationError('Invalid or expired token');
    }
}
