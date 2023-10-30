class Finder {
    constructor() {
        this.user_data = {}
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
            // const user_data = await response.json()
            this.user_data = await response.json()

            if (response.statusCode === 404) throw new Error("User not found")

            this.show_user_info()
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
}
const finder = new Finder()
