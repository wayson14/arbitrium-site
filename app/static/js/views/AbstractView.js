export default class {
    constructor(params) {
        this.params = params;
        this.api_url = '/api'
        // console.log(this.params);
        
    }

    setTitle(title) {
        document.title = title;
    }

    async getHTML() {
        return "";
    }

    async listener() {
        return ;
    }
}