import {React, useState, useEffect} from 'react'
import Post from './components/Post.js'
const Posts = () => {

    const [postsArray, setPostsArray] = useState([]);
    const data = {
        imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.y-70m9WxY7PTwGdYRSrePwHaGc%26pid%3DApi&f=1",
        title: "Tytuł",
        content: "Lorem ipsum",
    };
   
    const getPost = (id) => {
        return new Promise ((resolve, reject) => {
            fetch(`http://localhost:7000/posts/${id}`, {
                // headers : { 
                //     'Content-Type': 'application/json; charset=utf-8',
                //     'Accept': 'application/json'
                //    }
            })
                .then(response => response.json())
                .then(data => {
                    
                    resolve(data)});
        });
    }

    const addPost = (data) => {
        return new Promise ((resolve) => {
            posts.push(<Post postData={data}/>);
            resolve(posts);
        })
    }

    let posts = [];
    
    const fillPosts = (count) => {
        return new Promise ((resolve) => {
            for(let i = 1; i < count+1; i++){
                getPost(i).then(d => addPost(d))
            }
            //When it's removed suddenly works. Gotta find our why tommorow!
            resolve(true);
        })
    }
    
    

    useEffect (() => {
        fillPosts(2)
        .then(()=>setPostsArray(posts));
        console.log(posts);
    }, [])
    
    

    return (
        <div className="posts">
            {postsArray}
        </div>
    )
}

export default Posts
