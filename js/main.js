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
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'8aa75ff0efe091a57b35',
                    client_secret:'a3b79b60d442243b4e2e48ed30b2c8268a03a479',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                        <a target="_blank" href="${repo.html_url}"><strong>${repo.name}</strong>: ${repo.description}</a>
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
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
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/Blog: <a target="_blank" href="${user.blog}">${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});
