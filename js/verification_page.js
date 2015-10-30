
// AUTHORIZATION//
var gitcrud_username = "geekwisevinson";
var token = "YThlOTk0MTkzMzlhMmNmNmM4YTQ1ODE2ZmY2OTE2OGY5NDE0NzBhYw==";
token = atob(token);
var gitcrud = new Github({
    token:token,
    auth: "basic"
});

///TARGETING///

//CREATE GITHUB OBJECTS//
gitcrud_user = gitcrud.getUser();
///CREATE GITHUB OBJECTS///


var button_submit_code = document.getElementById('button_submit_code');
var input_username = document.getElementById('input_username');
var input_code = document.getElementById('input_code');

// create a list of gist
gitcrud_user.userGists(gitcrud_username,function(err,res) {
    gist_list = res;




    for (var i = 0;i<gist_list.length;i++){
        if (gist_list[i].description === 'user_database'){
            gist_user_database_object_unread = gitcrud.getGist(gist_list[i].id);
        }///if (gitcrud.getGist(gist_list[i].description === 'user_database'))
    }/// for (var i = 0;i<gist_list.length;i++){
    gist_user_database_object_unread.read(function(err,res){
        gist_user_database_github_object_read= res;// enables content to be readable
        console.log(gist_user_database_github_object_read);
        gist_user_database_json = gist_user_database_github_object_read.files["user_database.JSON"].content;//gets content as string
        gist_user_database_json = JSON.parse(gist_user_database_json);// turns string into object




        if (localStorage.hasOwnProperty('username')){
             if (gist_user_database_json[localStorage.username].hasOwnProperty('random_code')){

             }else{
                 window.location = "profile_page.html";
             }
        }
    });///gist_user_database.read(function(err,res){

});/// gitcrud_user.userGists();




button_submit_code.addEventListener('click',function(){alert('click');

    if (gist_user_database_json.hasOwnProperty(input_username.value)){}else{alert("username not found")}
    if (gist_user_database_json[input_username.value].random_code === input_code.value){ alert('success');

        delete gist_user_database_json[input_username.value].random_code;

        gist_user_database_github_object_read.files["user_database.JSON"].content = JSON.stringify(gist_user_database_json);
        gist_user_database_object_unread.update(gist_user_database_github_object_read,function(){
            alert('');
            localStorage.setItem('username',input_username.value);
            window.location = 'profile_page.html';
        });

    }

});