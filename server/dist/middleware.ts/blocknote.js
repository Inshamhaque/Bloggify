"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = void 0;
const validateApiKey = (req, res, next) => {
    var _a;
    const providedKey = req.headers['x-api-key'] || ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''));
    if (providedKey !== process.env.BLOCKNOTE_AI_SERVER_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
exports.validateApiKey = validateApiKey;
