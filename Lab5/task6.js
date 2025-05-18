$("#showPassword").click(function () {
    let pass = $("#password");
    if($(this).is(":checked")) {
        pass.prop("type", "text");
    } else {
        pass.prop("type", "password");
    }
})