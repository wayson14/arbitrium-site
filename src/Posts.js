import {React, useState, useEffect, useLayoutEffect} from 'react'
import Post from './components/Post.js'
const Posts = () => {

    const [postsArray, setPostsArray] = useState([]);
    const [fetchedPosts, setFetchedPosts] = useState(false);
    // const data = {
    //     imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.y-70m9WxY7PTwGdYRSrePwHaGc%26pid%3DApi&f=1",
    //     title: "Tytuł",
    //     content: "Lorem ipsum",
    // };
    
    const queryUrl = "http://localhost:7000/posts/"
    const getPost = (id) => {
        return new Promise ((resolve, reject) => {
            fetch(`${queryUrl}${id}`, {
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
            postsArray.push(<Post postData={data}/>);
            resolve(true);
        })
    }

    
    const fillPosts = (count) => {
        return new Promise ((resolve) => {
            let cycles = 0;
            for(let i = 1; i < count+1; i++){
                getPost(i).then(data => addPost(data)).then(()=>cycles++).then(()=>console.log(cycles))
                    .then(()=>{cycles === count && setFetchedPosts(true)})
                    .then(()=> {cycles === count && resolve(postsArray)})
            }
            //When it's removed suddenly works. Gotta find our why tommorow!
            
        })
    }
 
    

    useEffect (() => {
        {!fetchedPosts && fillPosts(2).then((x)=>console.log([...x]))}
        return () => {
            {fetchedPosts && setPostsArray([])};
        }
    }, [fetchedPosts])
    
    

    return (
        <div className="posts">
            {postsArray && [...postsArray]}
        </div>
    )
}

export default Posts
