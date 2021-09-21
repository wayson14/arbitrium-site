import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHTML() {
        return `
            <h1>Welcome to dashboard page!</h1>
        
        `
    }
}