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
        return `
            <h1>Welcome to posts page!</h1>
            <span>${JSON.stringify(this.data, null, 4)}</span>
        
        `
    }
}