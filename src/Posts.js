import {React, useState} from 'react'
import Post from './components/Post.js'
const Posts = () => {

    
    const [x, setX] = useState(0);
    const data = {
        imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.y-70m9WxY7PTwGdYRSrePwHaGc%26pid%3DApi&f=1",
        title: "Tytuł",
        content: "Lorem ipsum",
    };
   
    const getPost = (id) => {
        return new Promise ((resolve, reject) => {
            resolve(data);
        });
    }

    const addPost = (data) => {
        return new Promise ((resolve) => {
            posts.push(<Post postData={data}/>);
            resolve(posts);
        })
    }
    
    let posts = [];

    for(let i = 0; i < 5; i++){
        getPost(i).then(data => addPost(data))
    }
    
    

    return (
        <div className="posts">
            {data.title}
            <button onClick={(e) => console.log(data) }></button>
            {posts}
        </div>
    )
}

export default Posts
