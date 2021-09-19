import datetime
import mongoengine

class Post(mongoengine.Document):
    title = mongoengine.StringField(default=f'Post from {datetime.datetime.now().year}-{datetime.datetime.now().month:02d}-{datetime.datetime.now().day:02d}')
    text = mongoengine.StringField()
    images_urls = mongoengine.ListField()
    video_url = mongoengine.StringField()
    time = mongoengine.DateTimeField(default=datetime.datetime.now)
    author = mongoengine.StringField()

    meta = {
        'db_alias': 'core',
        'collection': 'posts'
    }