import AbstractView from "./AbstractView.js";
import Posts from "./Posts.js";
import navigateTo from "../index.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home page");
    }

    async getHTML() {
        let html_string = `
        <div id="homeContainer">
            <div id="middleDiv">
                
                <img src="/static/img/bigA_red_transparent.png"/ id="bigA">
                <input type="text" id="searchBox" placeholder="..."/>

            </div>
        </div>
        `;
        return html_string
    }

    async listener() {
        const searchBox = document.querySelector('#searchBox');
        searchBox.addEventListener("keydown", async (e) => {
            if (e.code == "Enter"){
                let to_find = String(searchBox.value);
                
                navigateTo(`/posts/${to_find}`);
                // const posts = new Posts;
                // let app_body = await posts.getHTML(to_find);
                // document.querySelector("#app").innerHTML = app_body;
            }
        });
        
    }
    

    


}