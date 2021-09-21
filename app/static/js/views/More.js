import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("More");
    }

    async getHTML() {
        return `
            <h1>Welcome to more page!</h1>
        
        `
    }
}