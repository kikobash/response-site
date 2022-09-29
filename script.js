var settingsmenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn");



var input_text = document.getElementById("inputed text")
var middle_content = document.getElementById("middle content")

var img_link = "<img class='post-img' src = 'feed-image-1.png'";
var count = 0;
var DataLink = "<img class='post-img' src = 'feed-image-1.png'";
var profile_pic = ""
var username = ""

function settingsMenuToggle(){
    settingsmenu.classList.toggle("settings-menu-height");
}
darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if(localStorage.getItem("theme")=="light"){
        localStorage.setItem("theme","dark");
    }
    else{
        localStorage.setItem("theme","light");
    }
}
if(localStorage.getItem("theme")=="light"){
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme")=="dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
} else{
    localStorage.setItem("theme","light");
}


function AddPost(dict){
    img_id = "feed_img" + count;
    var text = input_text.value;

    input_text.value = "";

    var today = new Date()
    var date = today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();
    var day = today.getDay();
    var year = today.getFullYear();
    var month = today.getMonth();
    var mins = today.getMinutes();
    var hrs = today.getHours();
    var userPic = profile_pic;
    var userName = username;
 
    if(dict != "none"){
        img_id = dict.ID;
        img_link = (dict.Link.indexOf("post-img") == -1 ) ? "<img class='post-img' src= " + dict.Link : dict.Link;
        DataLink = dict.Link;
        text = dict.Text;
        date = dict.Day + "/" + dict.Month + "/" + dict.Year + " " + dict.Hrs + ":" + dict.Mins;
        day = dict.Day;
        year = dict.Year;
        hrs = dict.Hrs;
        mins = dict.Mins;
        month = dict.Month;
        userPic = dict.Profile;
        userName = dict.username;
        
    }

    if (text.trim() == ""){
        alert("please input in a text")
        return;
    }
    
    let html = `<div class="post-container">
                    <div class="post-row">
                        <div class="user-profile">
                            <img src=` + userPic + ` width="50px" height="40px">
                            <div>
                                <p>` + username + `</p>
                                <span> ` + date + `</span>
                            </div>
                        </div>
                        <a href="#"><img src="dots.png" width="4px"></a>
                    </div>
                
                    <p class="post-text" id="post-text">` + text + `</p>
                    ` + img_link + ` id=` + img_id + `>

                    <div class="post-row">
                        <div class="activity-icon">
                            <div><img src="like-blue.png">500K</div>
                            <div><img src="comments.png">431</div>
                            <div><img src="share.png">120</div>
                        </div>
                        <div class="post-profile-icon">
                            <img src="profile-pic.jpg"> <small><img src="down.png"></small>
                        </div>
                    </div> 
                </div>`
                count = count + 1;
                middle_content.insertAdjacentHTML("afterend", html);

                //access the created image and create a canvas from it wjich will be used to create a string image to be saved into the be saed in the localStoreage
                //this works for only images
                
                let addedImg = document.getElementById(img_id)
                addedImg.onload = function()
                {
                    if(img_link.indexOf("img") != -1){
                        let post_info = {Link : DataLink,
                                        Profile: profile_pic,
                                        User: username,
                                        ID : img_id,
                                        Text: text,
                                        Day: day,
                                        Month: month,
                                        Year: year,
                                        Hrs: hrs,
                                        Mins: mins
                                        }
                        let posts = JSON.stringify(post_info)

                        if(localStorage.getItem("Posts") != null){
                            let Info = localStorage.getItem("Posts")
                            let array = JSON.parse(Info)
                            //to avoid duplicates
                        
                            if(array.indexOf(posts) != -1){
                                //do nothing
                            }
                            else{
                                array.push(posts)

                                localStorage.removeItem("Posts")
                                
                                localStorage.setItem("Posts", JSON.stringify(array))   
                            }                
                                            
                        }
                        else{
                            var array = new Array(posts)
                            localStorage.setItem("Posts", JSON.stringify(array))
                        }
                    }
                    
                
                img_link = "<img class='post-img' src = 'feed-image-1.png'";
                DataLink = "<img class='post-img' src = 'feed-image-1.png'";
                }
}

function DisplayAllPosts(){
    //change all of the profile  links on load
    //retrieve the stored profile info firs
    var current_profile = localStorage.getItem("Current Profile")
    current_profile = JSON.parse(current_profile)

    profile_pic = current_profile.pic;
    username = current_profile.name;

    //change the profile pic
    var profile_imgs = document.querySelectorAll(".profilePic");
    profile_imgs.forEach(element => {
        element.src = profile_pic
    });

    //change the username
    var profile_names = document.querySelectorAll(".userName");
    profile_names.forEach(element => {
        element.innerHTML = username
    });

    


    if(localStorage.getItem("Posts") != null){
        var posts = localStorage.getItem("Posts")
        var array = JSON.parse(posts) // convert the string back into an array
        array.forEach(element => {
            var dict = JSON.parse(element) //convert the element back into an object
            AddPost(dict)
        });
    }
}

function InputFile(){
    let file_selector = document.getElementById("file input");
    file_selector.click();

}

function LoadImg(){
    let file_selector = document.getElementById("file input");
    //get the file extension
    let ext = file_selector.value;
    ext = ext.substring(ext.indexOf(".") + 1);

    let reader = new FileReader();
    var file = ""
    reader.onload = function(){
        file = reader.result;
        DataLink = file;

        if(ext == "mp4" || ext == "mkv"){
            file = "<video class='post-vid' controls src=" + file;
        }
        else{
            file = "<img class='post-vid' src = " + file;
        }

        img_link = file;
        alert("image/video selected click on create to add your post. NB videos wont be stored due to memory")
    }
    

    reader.readAsDataURL(file_selector.files[0])
    file_selector.value = ""
}

function educationtoggle(){ 
    document.getElementById('education-form').style.display = "block"
    document.getElementById('education-form').classList.toggle('active');
}

var educ_count = 0;
function AddEducation(){
    let institution = document.getElementById("insititution")
    let award = document.getElementById("award")
    let date = document.getElementById("date").value.split("-")
    let educ = document.getElementById("educ_bg")
    let educ_id = "education " + educ_count;

    let year = date[0]
    let month = date[1]

    alert("waddddd")
    let html =  `<div class="event" id="` + educ_id + `">
                    <div class="left-event">
                        <h3>` + year + `</h3>
                        <span>Month - ` + month + `</span>
                    </div>
                    <div class="right-event">
                        <h4>` + award.value + `</h4>
                        <p><img src="profile-location.png">` + institution.value + `</p>
                        <input type="button" value="delete" onclick = "document.getElementById('` + educ_id + `').style.display = 'none'">
                    </div>


                </div>`
    educ.insertAdjacentHTML("afterbegin", html)
    date.value = ""
    institution.value = ""
    award.value = ""
    //hide the drop down
    document.getElementById('education-form').classList.toggle('active');
    document.getElementById('education-form').style.display = "none"

    educ_count++;
    
}
var hobbie_count = 0

function AddHobby(){
    var hobby = document.getElementById("hobbie name")
    if(hobby.value.trim() == ""){
        alert("please input in the hobby name")
    }
    else{
        let html = `<div id='hobbie` + hobbie_count + `' >
                    <a href="#"><img src="shortcut-1.png"><span>` + hobby.value + `</span>  </a>
                    <input type="button" value="delete" onclick="document.getElementById('hobbie` + hobbie_count + `').style.display = 'none'">
                    </div>`
                
        document.getElementById("Hobbies").insertAdjacentHTML('afterbegin', html)
        hobbie_count++;
    }
}
