let username_ele, avatar_ele, followers, following, repos_url,
repos_cnt_ele, created_at_ele, search_button;

class User{
    constructor(user_info){
        this.username = user_info.login;
        this.lcoation = user_info.location;
        this.company = user_info.company;
        this.followers = user.info.followers;
        this.following = user_info.following;
        this.repos_url = user_info.repos_url;
        this.avatar_url = user_info.avatar_url;
        this.public_repos = public_repos;
        this.created_at = created_at;
    }
}

    

 function bind_elements(){
 username_ele = document.querySelector('.profile_username');
 avatar_ele = document.querySelector('.profile_image_container');
 followers = document.querySelector('.profile_followers');
 following = document.querySelector('#follwing');
 repos_url = document.querySelector('.latest_repos');
 repos_cnt_ele = document.querySelector('.repo_count');
 created_at_ele = document.querySelector('.user_since');
 search_button = document.querySelector('.search_button');
}

