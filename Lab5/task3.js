$("#button-submit").click(function () {
    const email = $("#email").val();
    if(!($("#name").val())) {
        alert("Enter Name");
    } else if(!email) {
        alert("Enter Email");
    } else if(!$("#password").val()) {
        alert("Enter Password");
    } else if(!email.includes('@') || !email.includes('.')) {
        alert("Invalid Email");
    } else {
        alert("Form Submitted Successfully");
    }
})