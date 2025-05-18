document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
   
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem(email));
    console.log(user);
    if(!email || !password) {
        alert("All Fields Are Required To Sign Up!");
        return;
    }


    if (!user) {
        alert("No Account Found! Please Sign Up First!");
        return;
    }

    if(user.email === email && user.password === password) {
        alert("Login Successful!");
        return;
    }
    else {
        alert("Email Or Password Wrong");
    }
})