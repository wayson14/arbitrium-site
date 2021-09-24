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
        const posts = this.data
        console.log(posts)
        let html_string = '';
        let post_object;
        let idx = 0
        //you need to refactor this post object, because items in dictionary are in list - should be just items in dictionary or do enumerating to access proper item on an array
        
        for (let post in posts){
            post_object = await this.parse_from_db(posts.post);
            html_string += `
            <div class="post-item" id="postItem-${idx}"">
                <h3 class="post-item-time">${post_object.time}</h3>
                <h2 class="post-item-title">${post_object.title}</h2>
                <span class="post-item-text">${post_object.text}</span>
                
                <div class="post-img-container" id="imgContainer${idx}">
            `
            console.log(post_object.images_urls)
            let img_array = this.create_array(post_object.images_urls)
            console.log(img_array[1])
            for (let link in img_array){
                console.log(img_array[link])
                html_string += `
                <img src=${img_array[link]} class="post-img"/>
                `
            }
            html_string += `
                </div>
            </div>
            `
            idx ++;
        }
        
        console.log(post_object);
        
        
        return html_string
    }

    
    async parse_from_db(post) {
        let parsed = "{";
        for (let idx in post){
            parsed += `"${Object.keys(post[idx])}" : "${Object.values(post[idx])}"`
            if (idx < post.length-1){
                parsed += ','
            }
        }
        parsed += '}';
        // console.log(parsed)
        parsed = JSON.parse(parsed);
        return parsed;
    }
    create_array(array_str) {
    
        array_str = array_str.slice(1, -1,);
        let arr = array_str.split(/[,]/);
        return arr
    }
    
}