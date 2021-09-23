import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home page");
    }

    async getHTML() {
        return `
        <div id="homeContainer">
            <div id="middleDiv">
                <img src="/static/img/bigA_red_transparent.png"/ id="bigA">
                <input type="text" id="searchBox" placeholder="..."/>

            </div>
        </div>
        
        `
    }
}