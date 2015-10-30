// AUTHORIZATION//
var gitcrud_username = "geekwisevinson";
var token = "YThlOTk0MTkzMzlhMmNmNmM4YTQ1ODE2ZmY2OTE2OGY5NDE0NzBhYw==";
token = atob(token);
var gitcrud = new Github({
    token:token,
    auth: "basic"
});
///AUTHORIZATION///

//TARGETING//
var input_username = document.getElementById('input_username');
var input_password = document.getElementById('input_password');
var button_submit_login = document.getElementById('button_submit_login');
///TARGETING///

//CREATE GITHUB OBJECTS//
gitcrud_user = gitcrud.getUser();
///CREATE GITHUB OBJECTS///

// create a list of gist
gitcrud_user.userGists(gitcrud_username,function(err,res) {
    gist_list = res;
    for (var i = 0;i<gist_list.length;i++){
        if (gitcrud.getGist(gist_list[i].description === 'user_database')){
            gist_user_database_object_unread = gitcrud.getGist(gist_list[i].id);
        }///if (gitcrud.getGist(gist_list[i].description === 'user_database'))
    }/// for (var i = 0;i<gist_list.length;i++){
    gist_user_database_object_unread.read(function(err,res){
        gist_user_database_github_object_read= res;// enables content to be readable
        gist_user_database_json = gist_user_database_github_object_read.files["user_database.JSON"].content;//gets content as string
        gist_user_database_json = JSON.parse(gist_user_database_json);// turns string into object
    });///gist_user_database.read(function(err,res){
});/// gitcrud_user.userGists();


button_submit_login.addEventListener("click",function(){
   if(gist_user_database_json.hasOwnProperty(input_username.value)){
        if (gist_user_database_json[input_username.value].password===input_password.value){
            alert('login successful');
            window.localStorage.setItem('username',input_username.value);
            alert(window.localStorage.username)
            window.location = "verification_page.html"
        }else{
            alert('username and password does not match');
        }
   }else{
       alert('user not found')
   }
});