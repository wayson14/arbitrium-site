import {useState, useEffect, React} from 'react'

const About = () => {
    const [fetchedAboutContent, setFetchedAboutContent] = useState(false);
    const [content, setContent] = useState(null)
    const [aboutDOM, setAboutDOM] = useState(false)
    const queryUrl = "http://localhost:7000/about/"

    const fetchContent = () => {
        return new Promise ((resolve, reject) => {
            fetch(queryUrl)
            .then(res => res.json())
            .then(data=>resolve(data))
        })
    }

    useEffect(() => {
        fetchContent()
        .then(result => {
            return new Promise(resolve => {
                let fetchedContent = [];
                [fetchedContent] = result;
                console.log(fetchedContent);
                setContent(fetchedContent);
                setAboutDOM(true);
                resolve(result);
            })
            
        })
        .catch(err=>console.log(err));
        
        // setAboutContent(this.data);
        // console.log(this.data)
    }, [])

    //fix it!!!!!!!!
    // setAboutDOM([<img className="about-img" src={aboutContent?.imgUrl}/>
    //             ,<div className="post-text">{aboutContent?.content}</div>])

    return (
        
        <div className="container post-container post">
            {/* <div>{Object.entries(aboutContent)}</div> */}
            {/* {aboutContentLoaded && [...aboutDOM]} */}
            <img src={content?.imgUrl} className="about-img" alt="text alternatywny"/>
            <div className='container column post-text'>
                <h1 className='post-title'>{content?.title}</h1>
                <div>{content?.content}</div>
            </div>
            
            {/* {aboutDOM} */}
        </div>
        
    )
}

export default About
