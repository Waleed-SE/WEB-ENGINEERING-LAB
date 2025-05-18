document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(!name || !email || !password || !confirmPassword) {
        alert("All Fields Are Required To Sign Up!");
        return;
    }

    if(password !== confirmPassword) {
        alert("Password Not Same!");
        return;
    }

    if(password.length < 8) {
        alert("Password Must Be Atleast 8 Characters Long!");
        return;
    }

    const user = {name,email,password};
    localStorage.setItem(email, JSON.stringify(user));

    alert("Sign Up Successful!");
    window.location.href = "./task3login.html";
})