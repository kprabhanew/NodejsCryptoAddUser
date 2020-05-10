$(document).ready(function () {
    
    $(document).on('click', "#btn_cancel", function (event) {
        window.location.replace("http://localhost:3000/");
    })
    $(document).on('click', "#register", function (event) {
        event.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var cpassword = $("#cpassword").val();
        var dob = $("#dob").val();
        var country = $("#country").val();
        var gender = $('input[name="gender"]:checked').val();
        var preference = $('input[name="preference"]:checked').val();

        if (!name || !email || !password || !cpassword || !dob || !country || !gender) {
            $("#msgDiv").show().html("All fields are required.");
        } else if (cpassword != password) {
            $("#msgDiv").show().html("Passowrds should match.");
        } else if (!terms) {
            $("#msgDiv").show().html("Please agree to terms and conditions.");
        }
        else {
            $.ajax({
                url: "/register",
                method: "POST",
                data: { name: name, email: email, password: password, dob: dob, country: country, gender: gender, preference: preference }
            }).done(function (data) {
                if (data) {
                    if (data.status == 'error') {
                        $("#msgDiv").removeClass('alert-success').addClass('alert-danger').html(data.message).show();
                    } else {
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                        setTimeout(() => {
                            window.location.replace("http://localhost:3000/");
                        }, 400);
                    }
                }
            });
        }
    });
})
