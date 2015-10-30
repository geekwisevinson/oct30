// AUTHORIZATION//
var gitcrud_username = "geekwisevinson";
var token = "YThlOTk0MTkzMzlhMmNmNmM4YTQ1ODE2ZmY2OTE2OGY5NDE0NzBhYw==";
token = atob(token);
var gitcrud = new Github({
    token:token,
    auth: "basic"
});
var email_client = new mandrill.Mandrill(atob("ZUNKYmRjcUdoS2NwSlpRMlowZ3kzUQ=="));
///AUTHORIZATION///

//TARGETING//
var input_username = document.getElementById('input_username');
var input_email = document.getElementById('input_email');
var input_password = document.getElementById('input_password');
var input_password_confirm = document.getElementById('input_password_confirm');
var button_submit_sign_up = document.getElementById('button_submit_sign_up');

//ALERTS//
alert_username = document.getElementById('alert_username');
alert_password = document.getElementById("alert_password");
alert_email = document.getElementById("alert_email");
alert_password_match = document.getElementById('alert_password_mismatch');
alert_blank = document.getElementById("alert_blank");
///ALERTS///
///TARGETING///

//CREATE GITHUB OBJECTS//
gitcrud_user = gitcrud.getUser();
///CREATE GITHUB OBJECTS///

// create a list of gist
gitcrud_user.userGists(gitcrud_username,function(err,res) {
    gist_list = res;
    for (var i = 0;i<gist_list.length;i++){
        if (gist_list[i].description === 'email_database'){
            gist_email_database_object_unread = gitcrud.getGist(gist_list[i].id);
        }///if (gitcrud.getGist(gist_list[i].description === 'user_database'))
    }/// for (var i = 0;i<gist_list.length;i++){
    gist_email_database_object_unread.read(function(err,res){
        gist_email_database_github_object_read= res;// enables content to be readable

        gist_email_database_json = gist_email_database_github_object_read.files["email_database.JSON"].content;//gets content as string
        gist_email_database_json = JSON.parse(gist_email_database_json);// turns string into object
        console.log(gist_email_database_json);
    });///gist_email_database.read(function(err,res){


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
        console.log(gist_user_database_json)
    });///gist_user_database.read(function(err,res){

});/// gitcrud_user.userGists();

function makecode()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

random_code = makecode();



html_string =  "Code:"+ random_code + '\ <br />'+"Congradulations  " + input_username.value + "! please enter code to finished the sign up process. thank you and have a nice day!";

button_submit_sign_up.addEventListener('click',function(){

    //-----running a check to make sure there is no empty input fields
    if(input_username.value === '' || input_email.value === ''|| input_password.value === ''){

        alert_blank.classList.toggle('alert_hidden');

        return;
    }

    //--makes sure that the password is the correct password that you want by referencing and checking both password values
    if (input_password.value != input_password_confirm.value){

        alert_password_match.classList.toggle('alert_hidden');

        return;
    }

    //--- verifying that the username is not already being used
    if (gist_user_database_json.hasOwnProperty(input_username.value)){

        alert_username.classList.toggle('alert_hidden');

        return;
    }

    //----Cross checking email address to verify that the same email is not being used more than once
    if (gist_email_database_json.hasOwnProperty(input_email.value)){

        alert_email.classList.toggle('alert_hidden');

        return;
    }

    //----currently using the dynamic values in the form to assit with sending emails to users that have just signed up for service
    params = {

        "message": {

            "from_email":"vinsonfernandez27@gmail.com",

            "to":[{"email":input_email.value}],

            "subject": "Thanks for signing up",

            "html": html_string

        }
    };

    //----------currently updates database with new users so stays upto date
    gist_email_database_json[input_email.value]={};
    gist_email_database_json[input_email.value].password = input_password.value;
    gist_email_database_json[input_email.value].username = input_username.value;

    gist_user_database_json[input_username.value]={};
    gist_user_database_json[input_username.value].password = input_password.value;
    gist_user_database_json[input_username.value].email = input_email.value;
    gist_user_database_json[input_username.value].random_code = random_code;


    gist_email_database_github_object_read.files["email_database.JSON"].content = JSON.stringify(gist_email_database_json);
    gist_email_database_object_unread.update(gist_email_database_github_object_read,function(){

    });

    gist_user_database_github_object_read.files["user_database.JSON"].content = JSON.stringify(gist_user_database_json);
    gist_user_database_object_unread.update(gist_user_database_github_object_read,function(){
        window.location ="verification_page.html";
    });

    //sending email to new user
    send_the_email();


});

function send_the_email() {

    email_client.messages.send(params, function(res) {

        console.log(res);

    }, function(err) {
        console.log(err);
    });

}