"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
const authChecker = ({ context }) => {
    return !!context.user;
};
exports.authChecker = authChecker;
