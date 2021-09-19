### There are stored functions responsible 
### for connecting to DB and manipulating data
### which it consists. 


import mongoengine
import app.data.mongo_setup as mongo_setup
from app.services.scraper import get_posts_from_page
from app.data.posts import Post


### Remember the same properities must be specified in Post class in db document form.
#     title = (based on time)
#     text = mongoengine.StringField()
#     images_urls = mongoengine.ListField()
#     video_url = mongoengine.StringField()
#     time = mongoengine.DateTimeField(default=datetime.datetime.now)
#     author = mongoengine.StringField()
def create_post(**kwargs) -> Post:
    '''Every field of the newly created post which we want to populate must be specified in keyword argument passed to this function'''

    saved_locals = locals()
    if saved_locals['kwargs']:
        args = saved_locals['kwargs']

    del(saved_locals['kwargs'])
    for i in saved_locals:
        args += i
    post = Post()
    # print(args)
    for arg in args.keys():
        try:
            if args[f'{arg}'] is not None:
                post[f'{arg}'] = args[arg]
        except Exception as err:
            print(f'ERROR: {err}')
        
    post.save()
    return post

def delete_post(post: Post) -> bool:
    post.delete()
    return True


def get_post_by_id(id) -> Post:
    query = Post.objects(id).first()
    post = query

    return post

def get_post_by_index(idx) -> Post:
    all_posts = Post.objects().all()
    if idx < len(all_posts):
        post = all_posts[idx]
    else:
        post = all_posts[-1]
    
    return post

def get_all_posts() -> list:
    all_posts = Post.objects().all()
    return all_posts 