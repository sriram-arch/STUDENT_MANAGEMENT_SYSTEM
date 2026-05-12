

interface AttendanceStudent {
  name: string;
  regno: string;
}

const studentForm = document.getElementById('student-form') as HTMLFormElement;
const userTableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;
const attendanceTableBody = document.getElementById("attendanceTableBody") as HTMLTableSectionElement;
const totalStudentsSpan = document.getElementById("totalStudents") as HTMLSpanElement;
const presentCountSpan = document.getElementById("presentCount") as HTMLSpanElement;
const absentCountSpan = document.getElementById("absentCount") as HTMLSpanElement;
const saveAttendanceBtn = document.getElementById("saveAttendance") as HTMLButtonElement;

const students: AttendanceStudent[] = [];

function addStudentToTable(student: AttendanceStudent) {
  const existingStudent = students.find(s => s.regno === student.regno);
  if (existingStudent) return;

  const row = document.createElement("tr");
  row.innerHTML = ` 
    <td>${student.name}</td>
    <td>${student.regno}</td>
    <td>
      <label><input type="radio" name="attendance-${student.regno}" value="present"> Present</label>
      <label><input type="radio" name="attendance-${student.regno}" value="absent"> Absent</label>
    </td>
  `;
  attendanceTableBody.appendChild(row);
  students.push(student);
  populateDropdown(); // Ensure dropdown is updated
}

function updateStats() {
  const total = students.length;
  const present = document.querySelectorAll("tr.present").length;
  const absent = document.querySelectorAll("tr.absent").length;

  totalStudentsSpan.textContent = total.toString();
  presentCountSpan.textContent = present.toString();
  absentCountSpan.textContent = absent.toString();
}

saveAttendanceBtn.addEventListener("click", async () => {
  const rows = Array.from(attendanceTableBody.querySelectorAll("tr"));

  for (const row of rows) {
    const regno = row.children[1].textContent || "";
    const presentRadio = row.querySelector("input[value='present']") as HTMLInputElement;
    const status = presentRadio?.checked ? "present" : "absent";

    row.classList.remove("present", "absent");
    row.classList.add(status);

    try {
      const response = await fetch(`http://localhost:4000/users/dashboard/attendance/${regno}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actions: status }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.warn(`Failed to update attendance for ${regno}`, data.message);
      }
    } catch (err: any) {
      console.error("Attendance update error:", err.message);
    }
  }

  updateStats();
  alert("Attendance updated.");
});


interface Student {
  name: string;
  email: string;
  regno: string;
  phoneno: string;
}

studentForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('Username') as HTMLInputElement;
  const emailInput = document.getElementById('Useremail') as HTMLInputElement;
  const regnoInput = document.getElementById('Userregnumber') as HTMLInputElement;
  const phoneInput = document.getElementById('Userphonenumber') as HTMLInputElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const regno = regnoInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !regno || !phone) {
    alert("All fields are required!");
    return;
  }

  const submitButton = studentForm.querySelector("button[type='submit']") as HTMLButtonElement;
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch("http://localhost:4000/users/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Studentname: name,
        Studentemail: email,
        Studentregno: regno,
        Studentphone: phone,
      }),
    });

    const data = await response.json();

    if (response.ok && data.student) {
      const student = data.student as Student;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.regno}</td>
        <td>${student.phoneno}</td>
        <td><button class="edit-button">Edit</button> <button class="delete-button">Delete</button></td>
      `;
      userTableBody.appendChild(newRow);

      const newAttendanceStudent: AttendanceStudent = {
        name: student.name,
        regno: student.regno
      };

      addStudentToTable(newAttendanceStudent);
      updateStats();

      studentForm.reset();
    }
  } catch (error: any) {
    console.error("Error during fetch:", error.message);
    alert("Something went wrong. Please try again.");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

let editingRegno: string | null = null;

userTableBody.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;
  const row = target.closest('tr') as HTMLTableRowElement;
  if (!row) return;

  const cells = row.getElementsByTagName('td');
  const name = cells[0].textContent || '';
  const email = cells[1].textContent || '';
  const regno = cells[2].textContent || '';
  const phone = cells[3].textContent || '';

  if (target.classList.contains('edit-button')) {
    (document.getElementById('Username') as HTMLInputElement).value = name;
    (document.getElementById('Useremail') as HTMLInputElement).value = email;
    (document.getElementById('Userregnumber') as HTMLInputElement).value = regno;
    (document.getElementById('Userphonenumber') as HTMLInputElement).value = phone;

    editingRegno = regno;
  }

  if (target.classList.contains('delete-button')) {
    const confirmed = confirm(`Are you sure you want to delete student ${regno}?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:4000/users/dashboard/${regno}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        row.remove();
        alert("Student deleted successfully");
      } else {
        alert(data.message || "Failed to delete student");
      }
    } catch (error: any) {
      console.error("Delete error:", error.message);
      alert("Failed to delete student.");
    }
  }
});

              //  MARKSHEET PAGE


interface MarkEntry {
  name: string;
  regno: string;
  tamil: number;
  english: number;
  maths: number;
  science: number;
  social: number;
  total: number;
  grade: string;
}


const studentDropdown = document.getElementById("studentDropdown") as HTMLSelectElement;
const marksForm = document.getElementById("marksForm") as HTMLFormElement;
const gradeTableBody = document.querySelector("#gradeTable tbody") as HTMLTableSectionElement;
const studentNameDisplay = document.getElementById("studentNameDisplay")!;
const studentRegDisplay = document.getElementById("studentRegDisplay")!;

const tamilInput = document.getElementById("tamil") as HTMLInputElement;
const englishInput = document.getElementById("english") as HTMLInputElement;
const mathsInput = document.getElementById("maths") as HTMLInputElement;
const scienceInput = document.getElementById("science") as HTMLInputElement;
const socialInput = document.getElementById("social") as HTMLInputElement;

let selectedstudents: AttendanceStudent | null = null;

function populateDropdown() {
  studentDropdown.innerHTML = `<option value="">Select Student</option>`;
  students.forEach(student => {
    const option = document.createElement("option");
    option.value = student.regno;
    option.textContent = student.name;
    studentDropdown.appendChild(option);
  });
}

function calculateGrade(total: number): string {
  if (total > 450) return "A+";
  if (total > 400) return "A";
  if (total > 350) return "B+";
  if (total > 300) return "B";
  return "C";
}


studentDropdown?.addEventListener("change", () => {
  const regno = studentDropdown.value;
  selectedstudents = students.find(s => s.regno === regno) || null;

  if (selectedstudents) {
    studentNameDisplay.textContent = selectedstudents.name;
    studentRegDisplay.textContent = selectedstudents.regno;
    marksForm.style.display = "block";
  } else {
    marksForm.style.display = "none";
  }
});

marksForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedstudents) return;

  const tamil = parseInt(tamilInput.value);
  const english = parseInt(englishInput.value);
  const maths = parseInt(mathsInput.value);
  const science = parseInt(scienceInput.value);
  const social = parseInt(socialInput.value);

  const total = tamil + english + maths + science + social;
  const grade = calculateGrade(total);

  const markEntry: MarkEntry = {
    name: selectedstudents.name,
    regno: selectedstudents.regno,
    tamil,
    english,
    maths,
    science,
    social,
    total,
    grade
  };


  try {
    const response = await fetch(`http://localhost:4000/users/dashboard/mark/${markEntry.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(markEntry),
    });

    const result = await response.json();
    if (!response.ok) {
      alert(result.message || "Failed to save marks.");
    } else {
      console.log("Marks updated for:", markEntry.name);
    }
  } catch (error: any) {
    console.error("Error updating marks:", error.message);
    alert("Failed to update marks.");
  }

  // Update UI
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${selectedstudents.name}</td>
    <td>${total}</td>
    <td>${grade}</td>
  `;
  gradeTableBody.appendChild(newRow);

  marksForm.reset();
  marksForm.style.display = "none";
  studentDropdown.value = "";
});


const dashAddButton = document.getElementById("dashAddbutton");
const dashAttendanceButton = document.getElementById("dashAttendancebutton");
const dashMarkButton = document.getElementById("dashMarkbutton");

const addStudentSection = document.getElementById("addStudentSection");
const attendanceSection = document.getElementById("addAttendanceSection");
const MarksheetSection = document.getElementById("addMarksheet");

if (dashAddButton && dashAttendanceButton && dashMarkButton && addStudentSection && attendanceSection && MarksheetSection) {
  dashAddButton.addEventListener("click", (event) => {
    event.preventDefault();
    addStudentSection.style.display = "block";
    attendanceSection.style.display = "none";
    MarksheetSection.style.display = "none";
  });

  dashAttendanceButton.addEventListener("click", (event) => {
    event.preventDefault();
    attendanceSection.style.display = "block";
    addStudentSection.style.display = "none";
    MarksheetSection.style.display = "none";
  });

  dashMarkButton.addEventListener("click", (event) => {
    event.preventDefault();
    MarksheetSection.style.display = "block";
    attendanceSection.style.display = "none";
    addStudentSection.style.display = "none";
  });
}


const logout = document.getElementById('logout-btn') as HTMLElement;
logout.addEventListener('click', () => {
  window.location.replace('../login/login.html');
});

