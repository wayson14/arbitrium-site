import {React, useState} from 'react'
import Post from './components/Post.js'
const Posts = () => {

    
    const [x, setX] = useState(0);
    const data = {
        imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.y-70m9WxY7PTwGdYRSrePwHaGc%26pid%3DApi&f=1",
        title: "Tytuł",
        content: "Lorem ipsum",
    };
    let posts = [];
    
    const getPostCount = new Promise((resolve) => {
        resolve(3);
    });

    function inc() {
        getPostData.then(d => posts.push(<Post postData={d}/>))
        getPostCount.then(count => fillPostArray(count));
    };
    const getPostData = new Promise((resolve) => {
            resolve (data);
        });
    
    const fillPostArray = (count) =>{
        for (let i = 0; i < count; i++){
            getPostData.then(data => posts.push(<Post postData={data}/>));
        }
    };

    // let posts = [];
    
    
    

    return (
        <div className="posts">
            asdfasdfassasdfasdf{x}
            <button onClick={(e) => inc()}></button>
            {posts}
        </div>
    )
}

export default Posts
