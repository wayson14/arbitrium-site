import AbstractView from "./AbstractView.js";
import Home from "./Home.js";
import navigateTo from "../index.js";
export default class extends AbstractView {

      
    constructor(params) {
        super(params);
        if (Object.keys(params).length > 0){
            this.keyphrase = params.keyphrase;
            // for (let param in params){
            //     console.log(`${params}`)
            // }
            this.keyphrase = decodeURI(this.keyphrase);
            // console.log(this.keyphrase);
            this.setTitle(this.keyphrase);
        }
        else{
            this.keyphrase = "";
            this.setTitle("Posts");
        }
        
        // let keyphrase = this.keyphrase
        
    }
    // 127.0.0.1:5000/api/posts/2
    // https://reqres.in/api/users/2
    async getHTML() {
        //THIS KEYPHTASE couldnt be read, this is an error
        const keyphrase = this.keyphrase
        
        await fetch(this.api_url+'/posts/')
        .then(res => res.json())
        .then(data => { this.data = data;})
        .catch(error => console.log(error))
        const posts = this.data
        // console.log(posts)
        const cap = 10;
        let html_string = '';
        let post_object;
        let idx = 0
        let post_count = 0;

        
        for (let post in posts){
            if (idx == cap){
                break
            }
            
            let valid_post = false;
            
            post_object = await this.parse_from_db(posts[post]);
            if (keyphrase != ""){
                for (let prop in post_object){
                    if (String(post_object[prop]).toLowerCase().includes(keyphrase) == true){
                        valid_post = true;
                        post_count++;
                        continue;
                    }
                }
            }
            else{
                valid_post = true;
                post_count ++;
            }
            if (valid_post == false){
                continue;
            }
            html_string += `
            <div class="post-item" id="postItem-${idx}"">
                <h3 class="post-item-time">${post_object.time}</h3>
                <h2 class="post-item-title">${post_object.title}</h2>
                <span class="post-item-text">${post_object.text}</span>
                
                <div class="post-img-container" id="imgContainer${idx}">
            `
            // console.log(post_object.images_urls)

            let img_array = this.create_array(post_object.images_urls)
            // console.log(img_array[1])
            for (let link in img_array){
                // console.log(img_array[link])
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
        
        if (post_count == 0){

            navigateTo(`/home/${keyphrase} not found`);
            // const home = new Home;
            // html_string = await home.getHTML();
            // const middle_div = document.querySelector("#middleDiv");
            // middle_div.innerHTML = `
            // <div>
            // Brak wyników!
            // </div>`
        }

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
        try{
            parsed = JSON.parse(parsed)
        } //error is called because json cant parse \n character -> \ needs to be replaced by \\
        catch (error){
            console.log(error)
            
        }

        return parsed;
    }
    create_array(array_str) {
    
        array_str = array_str.slice(1, -1,);
        let arr = array_str.split(/[,]/);
        return arr
    }
    
}