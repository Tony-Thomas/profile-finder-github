$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // Make request to GitHub
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'8aa75ff0efe091a57b35',
                client_secret:'a3b79b60d442243b4e2e48ed30b2c8268a03a479'
            }
        }).done(function(user){
            $('#profile').html(`
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="label label-default">Default</span>
                            <span class="label label-primary">Primary</span>
                            <span class="label label-success">Success</span>
                            <span class="label label-info">Info</span>
                        </div>
                    </div>

                  </div>
                </div>
            `);
        });
    });
});
