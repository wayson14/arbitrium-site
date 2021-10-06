import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("More");
    }

    async getHTML() {
        let html_string = "";
        //"../../../data/documents/mongo_setup.py download="MONGO""
        html_string += `
        
        `
        return html_string;
            
    }
}