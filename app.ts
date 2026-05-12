// import express, { Request, Response } from "express";
// import bodyParser from 'body-parser';

import { pool } from './database/db';
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');


const app = express();
const PORT = 4000;
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.json());
app.use(express.static("public"))



pool.query("SELECT NOW()", (err: any, result: { rows: { now: any; }[]; }) => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("DB connected at:", result.rows[0].now); 
    }
});

                  //    API FOR LOGIN

app.post('/users/login', async (req:any, res:any) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Please enter both email and password." });
    }
  
    try{
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
         
        if(result.rows.length === 0){
            return res.status(401).json({ message: "Invalid email" });
        }
        const user = result.rows[0];

    
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    return res.status(200).json({ message: "Login successful", user });
    }
    catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
});    



                    // API FOR SIGNUP
app.post('/users/signup', async(req:any,res:any)=>{
    const {username,email,password,confirmPassword} = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    else if(password != confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    
    try {
        await pool.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
          [username, email, password]  
        );
    
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});





app.get('/users/student', async (req: any, res: any) => {
  try {
    const result = await pool.query('SELECT * FROM student ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Fetching students error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});







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




app.post('/users/dashboard', async (req: any, res: any) => {
  const { Studentname, Studentemail, Studentregno, Studentphone, tamil, english, maths,science,social,total,grade } = req.body;

  // Validate input
  if (!Studentname || !Studentemail || !Studentregno || !Studentphone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Insert into student table
    const result = await pool.query(
      'INSERT INTO student (name, email, regno, phoneno) VALUES ($1, $2, $3, $4) RETURNING *',
      [Studentname, Studentemail, Studentregno, Studentphone]
    );

    // Insert into attendance table
    await pool.query(
      'INSERT INTO attendance (name, regno) VALUES ($1, $2) RETURNING *',
      [Studentname, Studentregno]
    );

    // // Insert into mark table
    await pool.query(
      'INSERT INTO mark (name, regno) VALUES ($1, $2) RETURNING *',
      [Studentname, Studentregno]
    );

    const newStudent = result.rows[0];

    return res.status(200).json({
      message: "Student added successfully.",
      student: newStudent
    });

  } catch (error: any) {
    console.error('Database insert error:', error);

    if (error.code === '23505') {
      return res.status(409).json({ message: 'Student already exists.' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


  app.put('/users/dashboard/:Studentregno', async (req: any, res: any) => {
    const { Studentregno } = req.params;
    const { Studentname, Studentemail, Studentphone} = req.body;
  
    if (!Studentname || !Studentemail || !Studentregno || !Studentphone) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      // const result =
       await pool.query(
        'UPDATE student SET name = $1, email = $2, phoneno = $3 WHERE regno = $4',
        [Studentname, Studentemail, Studentphone, Studentregno]
      );
      await pool.query(
        'UPDATE attendance SET name = $1,  WHERE regno = $2',
        [Studentname,  Studentregno]
      );
      await pool.query(
        'UPDATE mark SET name = $1,  WHERE regno = $2',
        [Studentname,  Studentregno]
      );
  
       return res.status(200).json({message:'Update SUCCESSFULLY'});                                  
  
    } catch (error) {
      console.error('Database update error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
                                  // UPDATE API FOR ATTENDANCE

  app.put('/users/dashboard/attendance/:Studentregno', async (req:any, res:any) => {
    const { Studentregno } = req.params;
    const { actions } = req.body;
  
    try {
      await pool.query(
        'UPDATE attendance SET actions = $1 WHERE regno = $2',
        [actions, Studentregno] 
      );
  
      return res.status(200).json({ message: "UPDATED SUCCESSFULLY" });
    } catch (error) {
      console.error("Server error, not updated:", error);
      return res.status(500).json({ message: "SERVER ERROR" });
    }
  });
                        // UPDATE API FOR MARK

  app.put('/users/dashboard/mark/:Studentname', async (req:any, res:any) => {
    const { Studentname } = req.params;
    const { tamil, english, maths, science, social, total, grade } = req.body;
  
    try {
      await pool.query(
        `UPDATE mark 
         SET tamil = $1, english = $2, maths = $3, science = $4, social = $5, total = $6, grade = $7 
         WHERE name = $8`,
        [tamil, english, maths, science, social, total, grade, Studentname]
      );
  
      return res.status(200).json({ message: "MARKS UPDATED" });
    } catch (error) {
      console.error("Error updating marks:", error);
      return res.status(500).json({ message: "INTERNAL ERROR" });
    }
  });
  


  
  



  app.delete('/users/dashboard/:Studentregno', async(req:any,res:any) => {
    const { Studentregno } = req.params;
  
    try {
      // const result = 
      await pool.query('DELETE FROM student WHERE regno = $1 ', [Studentregno]);
       await pool.query('DELETE FROM attendance WHERE regno = $1 ', [Studentregno]);
      await pool.query('DELETE FROM mark WHERE regno = $1 ', [Studentregno]);
  
      // if (result.rowCount === 0) {
      //   return res.status(404).json({ message: 'Student not found.' });
      // }
  
      return res.status(200).json({ message: 'Student deleted successfully.' });
  
    } catch (error) {
      console.error('Database delete error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
 



app.listen(PORT,() =>{
    console.log(`Server running at http://localhost:${PORT}`);
});