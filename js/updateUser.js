$(document).ready(function () {
    
    $(document).on('click', "#btn_cancel", function (event) {
        window.location.replace("http://localhost:3000/");
    })
    var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var userId = url.searchParams.get("id");
console.log('url value : ' + userId);
if(userId){
    loadfunction(userId);
}   
    function loadfunction(userId) {
        
        $.ajax({
            url: "/updateUser/" + userId,
            method: "GET",
            dataType: "json",
            success: function (data) {

                if (data) {
                    if (data.status == 'success') {
                        // var success_str = '<ul>';
                        // $.each(data.message, function (key, value) {
                        //     success_str = success_str + '<li>' + value.msg + '</li>';
                        // });
                        // success_str = success_str + '</ul>';
                        if(data.message.length > 0){
                            $.each(data.message, function (key, value) {
                                console.log(value);
                                $('#recordId').val(value._id);
                                $("#name").val(value.name);
                                $("#email").val(value.email);
                                $("#password").val(value.password);
                                $("#cpassword").val(value.password);
                                var now = new Date(value.dob); 
                                var day = ("0" + now.getDate()).slice(-2);
                                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                                var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
                                
                                console.log(today);
                                $("#dob").val(today);
                                $("#country").val(value.country);
                                //$('input[name="gender"]').val(value.gender).prop('checked', true)
                                $('input[name="gender"]').filter('[value="'+value.gender+'"]').prop('checked', true);
                                $('input[name="preference"]').filter('[value="'+value.preference+'"]').prop('checked', true);
                                //$('input[name="preference"]').val(value.preference);
                                // $.each(value, function (key, value) {   
                                //     if(key == "_id"){
                                //         recordid = value;
                                //     } else if(key != "__v"){
                                //         if(key=='dob'){
                                //             value = new Date(value).toLocaleDateString();
                                //         }
                                //         console.log(key + ' : ' + value); 

                                       
                                //     }
                                // });
                            });

                        }else{
                            $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html('<p><center> No Records Available !</center></p>').show();
                            $('#msgDiv').after('<br/> <div class="container4" ><a href="addUser.html" class="btn btn-primary btn-xs pull-right"><b>+</b> Add Users</a></div>');
                        }
                        
                    } else {
                        console.log(data);
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                    }
                }
            },
            error: function (ex) {
                console.log('In error : ' + ex.message);
                $("#msgDiv").removeClass('alert-success').addClass('alert-danger').html(ex.message).show();
            }

        })
    }// load
    $(document).on('click', "#update_btn", function (event) {
        event.preventDefault();
        var id = $('#recordId').val();
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
                url: "/updateUser/:"+id,
                method: "PUT",
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
