import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Posts");
    }

    async getHTML() {
        return `
            <h1>Welcome to posts page!</h1>
        
        `
    }
}