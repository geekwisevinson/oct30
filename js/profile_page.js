
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
        gist_user_database_json = gist_user_database_github_object_read.files["user_database.JSON"].content;//gets content as string
        gist_user_database_json = JSON.parse(gist_user_database_json);// turns string into object
        console.log(gist_user_database_json);
    });///gist_user_database.read(function(err,res){


    for (var i = 0;i<gist_list.length;i++){
        if (gist_list[i].description === 'gist_database'){
            gist_gist_database_object_unread = gitcrud.getGist(gist_list[i].id);
        }///if (gitcrud.getGist(gist_list[i].description === 'user_database'))
    }/// for (var i = 0;i<gist_list.length;i++){
    gist_gist_database_object_unread.read(function(err,res){
        gist_gist_database_github_object_read= res;// enables content to be readable
        gist_gist_database_json = gist_gist_database_github_object_read.files["gist_database.JSON"].content;//gets content as string
        gist_gist_database_json = JSON.parse(gist_gist_database_json);// turns string into object
        console.log(gist_gist_database_json);
    });///gist_user_database.read(function(err,res){


    for (var i = 0;i<gist_list.length;i++){
        console.log(gist_list[i].description);
        if (gist_list[i].description === 'access_database'){
            gist_access_database_object_unread = gitcrud.getGist(gist_list[i].id);
        }///if (gitcrud.getGist(gist_list[i].description === 'user_database'))
    }/// for (var i = 0;i<gist_list.length;i++){
    gist_access_database_object_unread.read(function(err,res){
        gist_access_database_github_object_read= res;// enables content to be readable
        console.log(gist_access_database_github_object_read);
        gist_access_database_json = gist_access_database_github_object_read.files["access_database.JSON"].content;//gets content as string
        gist_access_database_json = JSON.parse(gist_access_database_json);// turns string into object
        console.log(gist_access_database_json);
    });///gist_user_database.read(function(err,res){

});/// gitcrud_user.userGists();



// user defined variables
var user_name;
var pass_word;
var gist_list;
var select_option;// used only to create new option
var current_gist;

//github_api defined variables
var github;
var user;
var gist;

var body = document.getElementsByTagName('body')[0];// targets body

// create user input
var input_username = document.getElementById('input_user');

// create password input
var input_password = document.createElement('input');
input_password.type= 'password';
input_password.placeholder = 'password';
body.appendChild(input_password);

//create login submit button
var submit_login = document.createElement('button');
submit_login.type = 'submit';
submit_login.innerHTML = 'Submit';
body.appendChild(submit_login);

// creates a selector for all gists a user has
var select_gist = document.createElement('select');
body.appendChild(select_gist);

// creates a submit button for gist selector
var submit_select_gists = document.createElement('button');
submit_select_gists.type = 'submit';
submit_select_gists.innerHTML = 'GIST';
body.appendChild(submit_select_gists);

// creates a selector for all files a selected gist has
var select_gist_files = document.createElement('select');
body.appendChild(select_gist_files);

// creates a submit button for file selected in gist
var submit_gist_files = document.createElement('button');
submit_gist_files.type = 'submit';
submit_gist_files.innerHTML = 'FILE';
body.appendChild(submit_gist_files);

// creates a submit button for file selected in gist
var input_tag = document.createElement('input');
input_tag.type = 'text';
input_tag.placeholder = 'add Tag';
body.appendChild(input_tag);

var submit_tag = document.createElement('button');
submit_tag.type = 'submit';
submit_tag.innerHTML = 'TAG';
body.appendChild(submit_tag);

var input_access = document.createElement('input');
input_access.type = 'text';
input_access.placeholder = 'add user';
body.appendChild(input_access);

var submit_access = document.createElement('button');
submit_access.type = 'submit';
submit_access.innerHTML = 'Add User';
body.appendChild(submit_access);

var input_groups = document.createElement('input');
input_groups.type = 'text';
input_groups.placeholder = 'add Group';
body.appendChild(input_groups);

var submit_groups = document.createElement('button');
submit_groups.type = 'submit';
submit_groups.innerHTML = 'Add Group';
body.appendChild(submit_groups);



// displays the content of selected file in gist
var gist_content = document.createElement('div');
body.appendChild(gist_content);

// when login submit button is pressed
submit_login.addEventListener('click',function(){
    // checks to see if username is undefined and sets values for username and password
    if (user_name != undefined){return;}
    user_name = input_username.value;
    pass_word = input_password.value;

    // creates github object and authenticates with github
    github = new Github({
        username: user_name,
        password: pass_word,
        auth: "basic"
    });

    // creates user object
    user = github.getUser();

    //creates a list of all gists
    user.userGists(user_name,function(err,res){
        gist_list = res;

        // creates an option for each gist a user has and adds a description if gist has one else "no description"
        var i=0;
        for (obj in gist_list){
            select_option = document.createElement('option');
            select_option.value = String(i);
            select_option.innerHTML =gist_list[i].description;
            if (select_option.innerHTML===''||null){select_option.innerHTML = 'no description'}
            select_gist.appendChild(select_option);
            i+=1;
        }
    })
});

// when gist is selected and submit is pressed
submit_select_gists.addEventListener('click',function(){
    select_gist_files.innerHTML= '';// clears all options to write new ones
    var gist_id = gist_list[select_gist.value].id;// gets github gist id for selected gist
    gist = github.getGist(gist_id);// creates github_api.js object gist;
    gist.read(function(err,res){ // api defined function to read content of api
        current_gist = res; // gist object with readable content
        var gist_files = current_gist.files; // list of files current gist has
        // creates an option for all files a selected gist has
        var i=0;
        for (obj in gist_files){
            select_option = document.createElement('option');
            select_option.value = String(i);
            select_option.innerHTML = obj;
            select_gist_files.appendChild(select_option);
            i+=1;
        }
    });
});

// when a file in a gist is selected and submit is pressed
submit_gist_files.addEventListener('click',function(){
    var gist_file_keys = Object.keys(current_gist.files);// creates an array of the keys of current gist object
    gist_content.innerHTML=  current_gist.files[gist_file_keys[select_gist_files.value]].content;// writes to div the content of selected file object
});

submit_tag.addEventListener('click',function(){

    if (gist_gist_database_json.hasOwnProperty(current_gist.url)){
        gist_gist_database_json[current_gist.url][input_tag.value]='true';
    }else{
        gist_gist_database_json[current_gist.url]= {};
        gist_gist_database_json[current_gist.url][input_tag.value]='true';
    }

    gist_gist_database_github_object_read.files["gist_database.JSON"].content = JSON.stringify(gist_gist_database_json);
    gist_gist_database_object_unread.update(gist_gist_database_github_object_read,function(){
        alert('update successful');
    });
});


submit_access.addEventListener('click',function(){
    if (gist_access_database_json.hasOwnProperty(input_access.value)){
        gist_access_database_json[input_access.value][current_gist.url]='true';
    }else{
        gist_access_database_json[input_access.value]= {};
        gist_access_database_json[input_access.value][current_gist.url]='true';
    }
    gist_access_database_github_object_read.files["access_database.JSON"].content = JSON.stringify(gist_access_database_json);
    gist_access_database_object_unread.update(gist_access_database_github_object_read,function(){
        alert('update successful');
    });
});