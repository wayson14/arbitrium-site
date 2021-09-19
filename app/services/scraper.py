### Scraper.py is a part responsible for
### obtaining facebook's posts' data, which
### is next transfered to a database of all posts.

from facebook_scraper import get_posts


def experimenting():
    posts = []
    for idx, post in enumerate(get_posts('134arbitrium')):
        posts.append(post)
        print(f'{idx + 1}. post has been successfully added!')
        # for item in posts[idx]:
        #     print(f'{item}: {posts[idx][item]}')

### important fields of post:
### text
### images_lowquality[]
### post_id
### video
### time
def get_posts_from_page(page_name = '134arbitrium', number_of_posts: int = 0) -> list:
    posts = []
    for idx, post in enumerate(get_posts(page_name)):
        if number_of_posts:
            if idx == number_of_posts:
                break
        posts.append(post)
    
    return posts



#print(get_posts_from_page(number_of_posts=1)[0]['text'])


 