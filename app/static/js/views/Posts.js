import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }
    // 127.0.0.1:5000/api/posts/2
    // https://reqres.in/api/users/2
    async getHTML() {
        
        
        await fetch(this.api_url+'/posts')
        .then(res => res.json())
        .then(data => {console.log(data);  this.data = data;})
        .catch(error => console.log(error))
        const posts = this.data
        console.log(posts, )
        let html_string = '';
        //you need to refactor this post object, because items in dictionary are in list - should be just items in dictionary or do enumerating to access proper item on an array
        for (let post in posts){
            for(let key in post){
              console.log(post)
                html_string += `<h2>${post[key]}</h2>`;
            }
        }
        // html_string +=         `
        //     <h1>Welcome to posts page!</h1>
        //     <span>${JSON.stringify(this.data, null, 4)}</span>
        
        // `
        return html_string
    }
}