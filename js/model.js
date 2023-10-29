
class Finder {
    constructor() {
        this.bind_elements();
        this.init_form();
        this.fetchData(this.input_value);
        this.show_user_info(this.user_data);

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

    init_form(){
        this.search_button.addEventListener('click', (e) => {
            e.preventDefault();
            this.input_value = this.username_inputbox_ele.value;
        });
    }

    async fetchData(username) {
        try {
            const response = await fetch("https://api.github.com/users/" + username);
            if (response.statusCode === 404) throw new Error("User not found");
            this.user_data = await response.json();
        } catch (e) {
            console.log(e);
            alert("Error fetching data. check username and try");
        }
    }

    show_user_info(user_data){
        const user_img = document.createElement('img');
        user_img.src = user_data.avatar_url;
        this.avatar_ele.appendChild(user_img); //image 처리

        this.username_ele.textContent = user_data.login;
        this.followers.textContent = user_data.followers;
        this.following.textContent = user_data.following;
        this.repos_cnt_ele.textContent = user_data.public_repos;
        this.created_at_ele.textContent = user_data.created_at;
        this.repos_url.href = user_data.html_url;
        this.username_inputbox_ele.innertText = '';
    }
    
}
const finder = new Finder();


