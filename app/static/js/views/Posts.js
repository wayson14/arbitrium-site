import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }
    // 127.0.0.1:5000/api/posts/2
    // https://reqres.in/api/users/2
    getHTML() {
        
        fetch('https://pokeapi.co/api/v2/ability/7/')
        .then(res => res.json())
        .then(data => console.log(data))
        
        return `
            <h1>Welcome to posts page!</h1>
            <span>${5}</span>
        
        `
    }
}