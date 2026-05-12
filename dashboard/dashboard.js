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
var _this = this;
var studentForm = document.getElementById('student-form');
var userTableBody = document.getElementById('userTableBody');
var attendanceTableBody = document.getElementById("attendanceTableBody");
var totalStudentsSpan = document.getElementById("totalStudents");
var presentCountSpan = document.getElementById("presentCount");
var absentCountSpan = document.getElementById("absentCount");
var saveAttendanceBtn = document.getElementById("saveAttendance");
var students = [];
function addStudentToTable(student) {
    var existingStudent = students.find(function (s) { return s.regno === student.regno; });
    if (existingStudent)
        return;
    var row = document.createElement("tr");
    row.innerHTML = "\n    <td>".concat(student.name, "</td>\n    <td>").concat(student.regno, "</td>\n    <td>\n      <label><input type=\"radio\" name=\"attendance-").concat(student.regno, "\" value=\"present\"> Present</label>\n      <label><input type=\"radio\" name=\"attendance-").concat(student.regno, "\" value=\"absent\"> Absent</label>\n    </td>\n  ");
    attendanceTableBody.appendChild(row);
    students.push(student);
    populateDropdown(); // Ensure dropdown is updated
}
function updateStats() {
    var total = students.length;
    var present = document.querySelectorAll("tr.present").length;
    var absent = document.querySelectorAll("tr.absent").length;
    totalStudentsSpan.textContent = total.toString();
    presentCountSpan.textContent = present.toString();
    absentCountSpan.textContent = absent.toString();
}
saveAttendanceBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var rows, _i, rows_1, row, regno, presentRadio, status_1, response, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rows = Array.from(attendanceTableBody.querySelectorAll("tr"));
                _i = 0, rows_1 = rows;
                _a.label = 1;
            case 1:
                if (!(_i < rows_1.length)) return [3 /*break*/, 7];
                row = rows_1[_i];
                regno = row.children[1].textContent || "";
                presentRadio = row.querySelector("input[value='present']");
                status_1 = (presentRadio === null || presentRadio === void 0 ? void 0 : presentRadio.checked) ? "present" : "absent";
                row.classList.remove("present", "absent");
                row.classList.add(status_1);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, fetch("http://localhost:4000/users/dashboard/attendance/".concat(regno), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ actions: status_1 }),
                    })];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                data = _a.sent();
                if (!response.ok) {
                    console.warn("Failed to update attendance for ".concat(regno), data.message);
                }
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error("Attendance update error:", err_1.message);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7:
                updateStats();
                alert("Attendance updated.");
                return [2 /*return*/];
        }
    });
}); });
studentForm === null || studentForm === void 0 ? void 0 : studentForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, emailInput, regnoInput, phoneInput, name, email, regno, phone, submitButton, response, data, student, newRow, newAttendanceStudent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                nameInput = document.getElementById('Username');
                emailInput = document.getElementById('Useremail');
                regnoInput = document.getElementById('Userregnumber');
                phoneInput = document.getElementById('Userphonenumber');
                name = nameInput.value.trim();
                email = emailInput.value.trim();
                regno = regnoInput.value.trim();
                phone = phoneInput.value.trim();
                if (!name || !email || !regno || !phone) {
                    alert("All fields are required!");
                    return [2 /*return*/];
                }
                submitButton = studentForm.querySelector("button[type='submit']");
                if (submitButton)
                    submitButton.disabled = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, fetch("http://localhost:4000/users/dashboard", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            Studentname: name,
                            Studentemail: email,
                            Studentregno: regno,
                            Studentphone: phone,
                        }),
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok && data.student) {
                    student = data.student;
                    newRow = document.createElement('tr');
                    newRow.innerHTML = "\n        <td>".concat(student.name, "</td>\n        <td>").concat(student.email, "</td>\n        <td>").concat(student.regno, "</td>\n        <td>").concat(student.phoneno, "</td>\n        <td><button class=\"edit-button\">Edit</button> <button class=\"delete-button\">Delete</button></td>\n      ");
                    userTableBody.appendChild(newRow);
                    newAttendanceStudent = {
                        name: student.name,
                        regno: student.regno
                    };
                    addStudentToTable(newAttendanceStudent);
                    updateStats();
                    studentForm.reset();
                }
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                console.error("Error during fetch:", error_1.message);
                alert("Something went wrong. Please try again.");
                return [3 /*break*/, 6];
            case 5:
                if (submitButton)
                    submitButton.disabled = false;
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
var editingRegno = null;
userTableBody.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var target, row, cells, name, email, regno, phone, confirmed, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = event.target;
                row = target.closest('tr');
                if (!row)
                    return [2 /*return*/];
                cells = row.getElementsByTagName('td');
                name = cells[0].textContent || '';
                email = cells[1].textContent || '';
                regno = cells[2].textContent || '';
                phone = cells[3].textContent || '';
                if (target.classList.contains('edit-button')) {
                    document.getElementById('Username').value = name;
                    document.getElementById('Useremail').value = email;
                    document.getElementById('Userregnumber').value = regno;
                    document.getElementById('Userphonenumber').value = phone;
                    editingRegno = regno;
                }
                if (!target.classList.contains('delete-button')) return [3 /*break*/, 5];
                confirmed = confirm("Are you sure you want to delete student ".concat(regno, "?"));
                if (!confirmed)
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:4000/users/dashboard/".concat(regno), {
                        method: "DELETE",
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (response.ok) {
                    row.remove();
                    alert("Student deleted successfully");
                }
                else {
                    alert(data.message || "Failed to delete student");
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Delete error:", error_2.message);
                alert("Failed to delete student.");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var studentDropdown = document.getElementById("studentDropdown");
var marksForm = document.getElementById("marksForm");
var gradeTableBody = document.querySelector("#gradeTable tbody");
var studentNameDisplay = document.getElementById("studentNameDisplay");
var studentRegDisplay = document.getElementById("studentRegDisplay");
var tamilInput = document.getElementById("tamil");
var englishInput = document.getElementById("english");
var mathsInput = document.getElementById("maths");
var scienceInput = document.getElementById("science");
var socialInput = document.getElementById("social");
var selectedstudents = null;
function populateDropdown() {
    studentDropdown.innerHTML = "<option value=\"\">Select Student</option>";
    students.forEach(function (student) {
        var option = document.createElement("option");
        option.value = student.regno;
        option.textContent = student.name;
        studentDropdown.appendChild(option);
    });
}
function calculateGrade(total) {
    if (total > 450)
        return "A+";
    if (total > 400)
        return "A";
    if (total > 350)
        return "B+";
    if (total > 300)
        return "B";
    return "C";
}
studentDropdown === null || studentDropdown === void 0 ? void 0 : studentDropdown.addEventListener("change", function () {
    var regno = studentDropdown.value;
    selectedstudents = students.find(function (s) { return s.regno === regno; }) || null;
    if (selectedstudents) {
        studentNameDisplay.textContent = selectedstudents.name;
        studentRegDisplay.textContent = selectedstudents.regno;
        marksForm.style.display = "block";
    }
    else {
        marksForm.style.display = "none";
    }
});
marksForm === null || marksForm === void 0 ? void 0 : marksForm.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var tamil, english, maths, science, social, total, grade, markEntry, response, result, error_3, newRow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                if (!selectedstudents)
                    return [2 /*return*/];
                tamil = parseInt(tamilInput.value);
                english = parseInt(englishInput.value);
                maths = parseInt(mathsInput.value);
                science = parseInt(scienceInput.value);
                social = parseInt(socialInput.value);
                total = tamil + english + maths + science + social;
                grade = calculateGrade(total);
                markEntry = {
                    name: selectedstudents.name,
                    regno: selectedstudents.regno,
                    tamil: tamil,
                    english: english,
                    maths: maths,
                    science: science,
                    social: social,
                    total: total,
                    grade: grade
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:4000/users/dashboard/mark/".concat(markEntry.name), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(markEntry),
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                if (!response.ok) {
                    alert(result.message || "Failed to save marks.");
                }
                else {
                    console.log("Marks updated for:", markEntry.name);
                }
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error updating marks:", error_3.message);
                alert("Failed to update marks.");
                return [3 /*break*/, 5];
            case 5:
                newRow = document.createElement("tr");
                newRow.innerHTML = "\n    <td>".concat(selectedstudents.name, "</td>\n    <td>").concat(total, "</td>\n    <td>").concat(grade, "</td>\n  ");
                gradeTableBody.appendChild(newRow);
                marksForm.reset();
                marksForm.style.display = "none";
                studentDropdown.value = "";
                return [2 /*return*/];
        }
    });
}); });
var dashAddButton = document.getElementById("dashAddbutton");
var dashAttendanceButton = document.getElementById("dashAttendancebutton");
var dashMarkButton = document.getElementById("dashMarkbutton");
var addStudentSection = document.getElementById("addStudentSection");
var attendanceSection = document.getElementById("addAttendanceSection");
var MarksheetSection = document.getElementById("addMarksheet");
if (dashAddButton && dashAttendanceButton && dashMarkButton && addStudentSection && attendanceSection && MarksheetSection) {
    dashAddButton.addEventListener("click", function (event) {
        event.preventDefault();
        addStudentSection.style.display = "block";
        attendanceSection.style.display = "none";
        MarksheetSection.style.display = "none";
    });
    dashAttendanceButton.addEventListener("click", function (event) {
        event.preventDefault();
        attendanceSection.style.display = "block";
        addStudentSection.style.display = "none";
        MarksheetSection.style.display = "none";
    });
    dashMarkButton.addEventListener("click", function (event) {
        event.preventDefault();
        MarksheetSection.style.display = "block";
        attendanceSection.style.display = "none";
        addStudentSection.style.display = "none";
    });
}
var logout = document.getElementById('logout-btn');
logout.addEventListener('click', function () {
    window.location.replace('../login/login.html');
});
