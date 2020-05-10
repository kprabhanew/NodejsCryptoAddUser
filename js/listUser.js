$(document).ready(function () {
    loadfunction();
    function loadfunction() {
        var success_str = '<thead>' +          
        '<tr>' +
            '<th>Full Name</th>' +
            '<th>Eamil</th>' +
            '<th>Password</th>' +
            '<th>DateOfBirth</th>' +
            '<th>Country</th>' +
            '<th>Gender</th>' +
            '<th>Meal Preference</th>' +
            '<th class="text-center">Action</th>' +
        '</tr>' +
    '</thead>';
        $.ajax({
            url: "/loaduser",
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
                            var recordid= '';
                            $.each(data.message, function (key, value) {
                                row = '<tr>';                                
                                $.each(value, function (key, value) {   
                                    if(key == "_id"){
                                        recordid = value;
                                    } else if(key != "__v"){
                                        if(key=='dob'){
                                            value = new Date(value).toLocaleDateString();
                                        } 
                                        success_str = success_str + '<td>' + value + '</td>'; 
                                    }
                                });
                                success_str = success_str + '<td class="text-center"><button class="btn btn-info btn-xs"  data-edid="'+recordid+'"  ><span class="glyphicon glyphicon-edit"></span>' +
                                    'Edit</button> <button data-delid="'+recordid+'" id="'+recordid+'"  class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span>' +
                                    'Del</button></td>' + '</tr>'
                                
                            });
                                    $('.custab').append(success_str);
                                    $('.custab').before('<a href="addUser.html" class="btn btn-primary btn-xs pull-right"><b>+</b> Add Users</a>')

                        }else{
                            $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html('<p><center> No Records Available !</center></p>').show();
                            $('#msgDiv').after('<br/> <div class="container4" ><a href="addUser.html" class="btn btn-primary btn-xs pull-right"><b>+</b> Add Users</a></div>');
                        }
                        
                    } else {
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                    }
                }
            },
            error: function (ex) {
                $("#msgDiv").removeClass('alert-success').addClass('alert-danger').html(data.message).show();
            }

        })
    }// load

    $(document).on('click', '.custab tbody tr td button:nth-child(2)', function(){
        var recordId = $(this).data('delid');
        deleteFunction(recordId);
    })

    $(document).on('click', '.custab tbody tr td button:nth-child(1)', function(){
        var recordId = $(this).data('edid');
        editFunction(recordId);
    })

    var a = $('#mydiv').data('myval'); //getter
    $('#mydiv').data('myval',20); //setter

    function deleteFunction(id) {
        $.ajax({
            url: "/users/:"+id,
            method: "DELETE",
            dataType: "json",
            success: function (data) {
                if (data) {
                    if (data.status == 'success') {
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-info').html(data.message).show();
                        setTimeout(() => {
                            location.reload();                                                                
                        }, 4000);
                    }
                }
            },
            error: function (ex) {
                $("#msgDiv").removeClass('alert-info').addClass('alert-danger').html(data.message).show();                    
            }

        })
    }// deletefunction

    function editFunction(id) {
        window.location.replace("http://localhost:3000/updateUser.html?id="+id);
    }// deletefunction
})