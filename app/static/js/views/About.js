import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("About");
    }

    async getHTML() {
        return `
            <h1>Welcome to about page!</h1>
        
        `
    }
}