const form = document.getElementById("Loginform") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
 
  const emailInput = document.getElementById("loginUsername") as HTMLInputElement;
  const passwordInput = document.getElementById("loginUserpassword") as HTMLInputElement;
  event.preventDefault();

  const UserEmail = emailInput.value.trim();
  const UserPassword = passwordInput.value.trim();

  if (!UserEmail || !UserPassword) {
    alert("Please enter both email and password.");
    return;
  }

  loginUser(UserEmail, UserPassword);
});

// Async function to handle login
async function loginUser(UserEmail: string, UserPassword: string) {
  try {
    
    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:UserEmail, password:UserPassword }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("User login successfull")
      window.location.href = "../dashboard/dashboard.html";
    }else {
      const errorMessage = data?.message || "Invalid email or password";
      alert(errorMessage);
    }
    // console.log("Login successful:", data);

    // alert("Login successful!");
  } catch (error) {
    
    console.error("Login error:", error);
    alert("Login failed. Please check your credentials.");
  }
}
