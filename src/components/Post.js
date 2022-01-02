import {useState, React} from 'react'

const Post = ({postData}) => {
    const [title, setTitle] = useState(postData.title)
    const [content, setContent] = useState(postData.content)
    const [imgUrl, setImgUrl] = useState(postData.imgUrl)
    return (
        <div className='post-container container post'>
            <img className='post-img' src={imgUrl}/>
            <div className='container column post-text'>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Post
