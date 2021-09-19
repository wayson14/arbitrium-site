import pytest
import mongoengine
from app.scraper import get_posts_from_page
from app.services.data_service import *
from app.data.mongo_setup import *

def test_global_init():
    global_init()
