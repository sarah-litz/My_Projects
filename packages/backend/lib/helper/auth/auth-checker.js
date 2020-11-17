"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
exports.authChecker = ({ root, args, context, info }, roles) => {
    var _a;
    return !!((_a = context.me) === null || _a === void 0 ? void 0 : _a.id);
};
