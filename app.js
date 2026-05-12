"use strict";
// import express, { Request, Response } from "express";
// import bodyParser from 'body-parser';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./database/db");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
db_1.pool.query("SELECT NOW()", function (err, result) {
    if (err) {
        console.error("DB connection failed:", err);
    }
    else {
        console.log("DB connected at:", result.rows[0].now);
    }
});
//    API FOR LOGIN
app.post('/users/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, result, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: "Please enter both email and password." })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query("SELECT * FROM users WHERE email = $1", [email])];
            case 2:
                result = _b.sent();
                if (result.rows.length === 0) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid email" })];
                }
                user = result.rows[0];
                if (user.password !== password) {
                    return [2 /*return*/, res.status(401).json({ message: "Incorrect password" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "Login successful", user: user })];
            case 3:
                err_1 = _b.sent();
                console.error("Error during login:", err_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API FOR SIGNUP
app.post('/users/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, confirmPassword, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                if (!username || !email || !password || !confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                }
                else if (password != confirmPassword) {
                    return [2 /*return*/, res.status(400).json({ message: "Passwords do not match" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "User created successfully" })];
            case 3:
                error_1 = _b.sent();
                console.error("Error inserting user:", error_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/users/student', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query('SELECT * FROM student ORDER BY id ASC')];
            case 1:
                result = _a.sent();
                res.status(200).json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Fetching students error:", error_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// API FOR DASHBOARD
// app.post('/users/dashboard', async (req: { body: { Studentname: any; Studentemail: any; Studentregno: any; Studentphone: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; student?: any; }): any; new(): any; }; }; }) => {
//     const { Studentname, Studentemail, Studentregno, Studentphone } = req.body;
//     // Input validation
//     if (!Studentname || !Studentemail || !Studentregno || !Studentphone) {
//       return res.status(400).json({ message: "All fields are required." });
//     }
//     try {
//       // const result = 
//       await pool.query(
//         'INSERT INTO student (name, email, regno, phoneno) VALUES ($1, $2, $3, $4) RETURNING *',
//         [Studentname, Studentemail, Studentregno, Studentphone]
//       );
//       await pool.query(
//         'INSERT INTO attendance (name, regno, ) VALUES ($1, $2) RETURNING *',
//         [Studentname, Studentregno]
//       );
//       await pool.query(
//         'INSERT INTO mark (name, regno) VALUES ($1, $2 ) RETURNING *',
//         [Studentname,  Studentregno, ]
//       );
//       const newStudent = result.rows[0];
//       student: newStudent 
//       return res.status(200).json({message:"add student"});
//     } catch (error) {
//       console.error('Database insert error:', error);
//       // Handle duplicate regno or other errors gracefully
//       if ((error as any).code === '23505') {
//         return res.status(409).json({ message: 'Student already exists.' });
//       }
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
app.post('/users/dashboard', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Studentname, Studentemail, Studentregno, Studentphone, tamil, english, maths, science, social, total, grade, result, newStudent, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, Studentname = _a.Studentname, Studentemail = _a.Studentemail, Studentregno = _a.Studentregno, Studentphone = _a.Studentphone, tamil = _a.tamil, english = _a.english, maths = _a.maths, science = _a.science, social = _a.social, total = _a.total, grade = _a.grade;
                // Validate input
                if (!Studentname || !Studentemail || !Studentregno || !Studentphone) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required." })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.pool.query('INSERT INTO student (name, email, regno, phoneno) VALUES ($1, $2, $3, $4) RETURNING *', [Studentname, Studentemail, Studentregno, Studentphone])];
            case 2:
                result = _b.sent();
                // Insert into attendance table
                return [4 /*yield*/, db_1.pool.query('INSERT INTO attendance (name, regno) VALUES ($1, $2) RETURNING *', [Studentname, Studentregno])];
            case 3:
                // Insert into attendance table
                _b.sent();
                // // Insert into mark table
                return [4 /*yield*/, db_1.pool.query('INSERT INTO mark (name, regno) VALUES ($1, $2) RETURNING *', [Studentname, Studentregno])];
            case 4:
                // // Insert into mark table
                _b.sent();
                newStudent = result.rows[0];
                return [2 /*return*/, res.status(200).json({
                        message: "Student added successfully.",
                        student: newStudent
                    })];
            case 5:
                error_3 = _b.sent();
                console.error('Database insert error:', error_3);
                if (error_3.code === '23505') {
                    return [2 /*return*/, res.status(409).json({ message: 'Student already exists.' })];
                }
                return [2 /*return*/, res.status(500).json({ message: 'Internal Server Error' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.put('/users/dashboard/:Studentregno', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Studentregno, _a, Studentname, Studentemail, Studentphone, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Studentregno = req.params.Studentregno;
                _a = req.body, Studentname = _a.Studentname, Studentemail = _a.Studentemail, Studentphone = _a.Studentphone;
                if (!Studentname || !Studentemail || !Studentregno || !Studentphone) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required." })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                // const result =
                return [4 /*yield*/, db_1.pool.query('UPDATE student SET name = $1, email = $2, phoneno = $3 WHERE regno = $4', [Studentname, Studentemail, Studentphone, Studentregno])];
            case 2:
                // const result =
                _b.sent();
                return [4 /*yield*/, db_1.pool.query('UPDATE attendance SET name = $1,  WHERE regno = $2', [Studentname, Studentregno])];
            case 3:
                _b.sent();
                return [4 /*yield*/, db_1.pool.query('UPDATE mark SET name = $1,  WHERE regno = $2', [Studentname, Studentregno])];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Update SUCCESSFULLY' })];
            case 5:
                error_4 = _b.sent();
                console.error('Database update error:', error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Internal Server Error' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
// UPDATE API FOR ATTENDANCE
app.put('/users/dashboard/attendance/:Studentregno', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Studentregno, actions, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Studentregno = req.params.Studentregno;
                actions = req.body.actions;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('UPDATE attendance SET actions = $1 WHERE regno = $2', [actions, Studentregno])];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "UPDATED SUCCESSFULLY" })];
            case 3:
                error_5 = _a.sent();
                console.error("Server error, not updated:", error_5);
                return [2 /*return*/, res.status(500).json({ message: "SERVER ERROR" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// UPDATE API FOR MARK
app.put('/users/dashboard/mark/:Studentname', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Studentname, _a, tamil, english, maths, science, social, total, grade, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Studentname = req.params.Studentname;
                _a = req.body, tamil = _a.tamil, english = _a.english, maths = _a.maths, science = _a.science, social = _a.social, total = _a.total, grade = _a.grade;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query("UPDATE mark \n         SET tamil = $1, english = $2, maths = $3, science = $4, social = $5, total = $6, grade = $7 \n         WHERE name = $8", [tamil, english, maths, science, social, total, grade, Studentname])];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "MARKS UPDATED" })];
            case 3:
                error_6 = _b.sent();
                console.error("Error updating marks:", error_6);
                return [2 /*return*/, res.status(500).json({ message: "INTERNAL ERROR" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/users/dashboard/:Studentregno', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Studentregno, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Studentregno = req.params.Studentregno;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                // const result = 
                return [4 /*yield*/, db_1.pool.query('DELETE FROM student WHERE regno = $1 ', [Studentregno])];
            case 2:
                // const result = 
                _a.sent();
                return [4 /*yield*/, db_1.pool.query('DELETE FROM attendance WHERE regno = $1 ', [Studentregno])];
            case 3:
                _a.sent();
                return [4 /*yield*/, db_1.pool.query('DELETE FROM mark WHERE regno = $1 ', [Studentregno])];
            case 4:
                _a.sent();
                // if (result.rowCount === 0) {
                //   return res.status(404).json({ message: 'Student not found.' });
                // }
                return [2 /*return*/, res.status(200).json({ message: 'Student deleted successfully.' })];
            case 5:
                error_7 = _a.sent();
                console.error('Database delete error:', error_7);
                return [2 /*return*/, res.status(500).json({ message: 'Internal Server Error' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server running at http://localhost:".concat(PORT));
});
