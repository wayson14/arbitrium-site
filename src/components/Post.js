import {useState, React} from 'react'

const Post = ({postData}) => {
    const [title, setTitle] = useState(postData.title)
    const [content, setContent] = useState(postData.content)
    const [imgUrl, setImgUrl] = useState(postData.imgUrl)
    return (
        <div className='post-container container post'>
            <img className='post-img' src={imgUrl}/>
            <div className='container post-text column '>
                <h1 className='post-title'>{title}</h1>
                <div>{content}</div>
            </div>
        </div>
    )
}

export default Post
