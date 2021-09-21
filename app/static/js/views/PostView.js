import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle(`Post of index ${params.id}`);
    }

    async getHTML() {
        return `
            <h1>${this.params.id}. post</h1>
        
        `
    }
}