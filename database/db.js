"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "sms",
    password: "Sriram@2004",
    port: 7000,
});
exports.default = exports.pool;
