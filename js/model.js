
class Finder {
    constructor() {
        this.url = "https://api.github.com/users/";

    }
    
    bind_elements() {
        this.username_ele = document.querySelector('.profile_username');
        this.avatar_ele = document.querySelector('.profile_image_container');
        this.followers = document.querySelector('.profile_followers');
        this.following = document.querySelector('#follwing');
        this.repos_url = document.querySelector('.latest_repos');
        this.repos_cnt_ele = document.querySelector('.repo_count');
        this.created_at_ele = document.querySelector('.user_since');
        this.search_button = document.querySelector('.search_button');
        this.username_inputbox_ele = document.querySelector('#username_inputbox');
    }
}



async function fetchData(username) {
    try {
        const response = await fetch("https://api.github.com/users/" + username);
        if (response.statusCode === 404) throw new Error("User not found");
        user_data = await response.json();
    } catch (e) {
        console.log(e);
        alert("Error fetching data. check username and try");
    }
}



function bind_elements() {
    username_ele = document.querySelector('.profile_username');
    avatar_ele = document.querySelector('.profile_image_container');
    followers = document.querySelector('.profile_followers');
    following = document.querySelector('#follwing');
    repos_url = document.querySelector('.latest_repos');
    repos_cnt_ele = document.querySelector('.repo_count');
    created_at_ele = document.querySelector('.user_since');
    search_button = document.querySelector('.search_button');
    username_inputbox_ele = document.querySelector('#username_inputbox');
}
User.init();


