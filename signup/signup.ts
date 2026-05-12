const signupForm = document.getElementById('signup_form') as HTMLFormElement | null;
if(!signupForm){
  console.error("SIGNUP FORM NOT FOUND");
}else{
signupForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();
  console.log("hiii");
  const Username = (document.getElementById("Username") as HTMLInputElement).value;
  const Useremail = (document.getElementById("Useremail") as HTMLInputElement).value;
  const Userpassword = (document.getElementById("Userpassword") as HTMLInputElement).value;
  const UserconfirmPassword = (document.getElementById("UserconfirmPassword") as HTMLInputElement).value;

  if (!Username || !Useremail || !Userpassword || !UserconfirmPassword) {
    alert("All fields are required");
    return;
  }

  if (Userpassword !== UserconfirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    console.log("hii tryy");
    const response = await fetch("http://localhost:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username:Username, email:Useremail, password:Userpassword, confirmPassword:UserconfirmPassword })
    
    });

    const data = await response.json();

    if (response.ok) {
      alert("New user added");
      window.location.href = '../login/login.html';
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (error: any) {
    console.log("hii catch");
    console.error("SIGNUP ERR:", error.message);
    alert("Something went wrong. Please try again.");
  }
});
}


