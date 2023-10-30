class Finder {
    constructor() {
        this.user_data = {}
        this.user_repos ={}
        this.bind_elements()
        this.init_form()

    }

    bind_elements() {
        this.username_ele = document.querySelector(".profile_username")
        this.avatar_ele = document.querySelector(".profile_img")
        this.followers = document.querySelector(".follow_title")
        this.following = document.querySelector("#following")
        this.repos_url = document.querySelector(".latest_repos")
        this.repos_cnt_ele = document.querySelector(".repo_count")
        this.created_at_ele = document.querySelector(".user_since")
        this.search_button = document.querySelector("#search_button")
        this.username_inputbox_ele = document.querySelector("#username_input_box")
        this.company_ele = document.querySelector(".company_name");
        this.bio_ele = document.querySelector(".user_bio");
        this.location_ele = document.querySelector(".user_location");
        this.blog_ele = document.querySelector(".user_blog");
        this.user_repos_ele = document.querySelector(".latest_repos");
    }

    init_form() {
        this.search_button.addEventListener("click", (e) => {
            e.preventDefault()
            this.form_submit()
        })
        this.username_inputbox_ele.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault()
                this.form_submit()
            }
        })
        this.username_inputbox_ele.addEventListener("focusout", this.form_submit.bind(this))
    }

    form_submit() {
        if (this.username_inputbox_ele.value !== "") {
            this.fetch_data(this.username_inputbox_ele.value)
            this.username_inputbox_ele.value = ""
        }

    }

    async fetch_data(username) {
        try {
            const response = await fetch(
                "https://api.github.com/users/" + username
            )
            const response2 =  await fetch(
                "https://api.github.com/users/" + username + "/repos"
            )
            // const user_data = await response.json()
            this.user_data = await response.json()
            this.user_repos = await response2.json()
            

            if (response.statusCode === 404) throw new Error("User not found")
            if (response2.statusCode === 404) throw new Error("Not loading user repositories")

            this.show_user_info()
            this.show_user_repos()
            // console.log(user_data)
        } catch (e) {
            console.log(e)
            alert("Error fetching data. check username and try")
        }
    }

    show_user_info() {
        this.avatar_ele.src = this.user_data.avatar_url
        this.username_ele.innerText = `profile username : ${this.user_data.login}`
        this.repos_cnt_ele.innerText = `public repository count : ${this.user_data.public_repos}`
        this.followers.innerText = `follow : ${this.user_data.followers} following : ${this.user_data.following}`
        this.created_at_ele.innerText = `user since : ${this.user_data.created_at}`
        this.company_ele.innerText = `company : ${this.user_data.company}`
        this.bio_ele.innerText = `bio : ${this.user_data.bio}`
        this.location_ele.innerText = `location : ${this.user_data.location}`
        this.blog_ele.innerText = `blog : ${this.user_data.blog}`
        this.blog_ele.href = this.user_data.blog
        
    }
    show_user_repos() {
        if(this.user_repos_ele.childElementCount>0){
            while(this.user_repos_ele.childElementCount!=0){
                this.user_repos_ele.removeChild(this.user_repos_ele.firstChild)
            }
        }
        
        this.user_repos.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
        const recent_repos = this.user_repos.slice(0,5);
        
        recent_repos.forEach((repo)=>{
            const repo_ele = document.createElement("div");
            repo_ele.classList.add("repo_items");
            
            
            const rep_name = document.createElement("a");
            rep_name.innerText = repo.name;
            rep_name.href = repo.html_url;
            rep_name.style.color = "white";
            rep_name.style.fontSize = "24px";
            rep_name.style.textDecoration = "none";
            repo_ele.appendChild(rep_name);
            this.user_repos_ele.appendChild(repo_ele);
        })



        
    }
}
const finder = new Finder()
