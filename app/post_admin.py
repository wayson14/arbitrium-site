import datetime
from types import TracebackType
from dateutil import parser
import mongoengine
import traceback

import app.services.data_service as svc
import app.services.scraper as scraper
import app.data.mongo_setup as mongo_setup
from app.data.posts import Post

def main():
    mongo_setup.global_init()
    print('Initialized database.')

    menu = """
[a]dd 
[d]elete 
[u]pdate
[l]ist
[s]ync from facebook
e[x]it    
    """
    while(True):
        try:
            print(menu)
            choice = input(f'Choose your action: ').lower()
            if choice == 'a':
                add_post()
            elif choice == 'd':
                delete_post()
            elif choice == 'u':
                update_post()
            elif choice == 'l':
                list_posts()
            elif choice =='s':
                sync_from_page()
            elif choice == 'x':
                exit()
            else:
                continue
        except KeyboardInterrupt:
            print("\nGoing up...")
            continue

def add_post():
    title = input('Write post\'s title: ')
    text = input('Write text: ')
    images_urls = input('Write images_urls (spaces will be treated as deliminators of the links): ').split()
    author = input('Write the author: ')
    svc.create_post(text=text, images_urls=images_urls, title=title, author=author)
    
def delete_post():
    idx = int(input('Pass index of the post you want to delete: '))
    post_list = []
    
    amount = int(input('How many posts in a row do you want to delete (including the chosen): '))
    for i in range(amount):
        try:
            post_list.append(svc.get_post_by_index(i+idx))      
        except (IndexError, KeyError) as err:
            print(err)
            print(f'Deleted only {i} posts')
            break
    for i in post_list:
        i.delete()
            

def update_post():
    try:
        while(True):
            list_posts()
            try:
                post_idx = int(input('Pass index of the post you want to update: '))
            
            except Exception as err:
                print(f"ERROR: {err}")
                continue

            idx_dict = {}
            try:
                post = svc.get_post_by_index(post_idx)
            except Exception as err:
                print(f"ERROR: {err}")
                continue
            else:
                break

        while(True):
            
            print(f"Which field would you like to edit [0 - {len(post)-1}]: ")
        
        
            for idx, field in enumerate(post):
                idx_dict[f"{idx}"] = field
                value = post[f'{field}']
                print(f'{idx}. {field}: {value} type = {type(value)}')
            
            try:
                choice = str(input(f"Index: "))
                field = idx_dict[choice]
                value = post[field]
            except KeyboardInterrupt:
                print("Going level up...")
                break
            except Exception as err:
                print(f'ERROR: {err}')
                continue
            if type(value) == str:
                try:
                    new_value = input(f"New value of {idx_dict[choice]} : ")
                    post[f"{idx_dict[choice]}"] = new_value
                except Exception as err:
                    print(f'ERROR: {err}')
                    continue
            elif type(value) == datetime.datetime:
                try:
                    date = parser.parse(input("Print date in format [yyyy-mm-dd hh:mm:ss] "))
                    post[field] = date
                except KeyboardInterrupt:
                    print("Going level up...")
                    break
                except Exception as err:
                    print(f'ERROR: {err}')
                    continue


            elif type(value) == mongoengine.base.datastructures.BaseList:
                try:
                    choice = str(input("[a]ppend / [o]verwrite: ").lower())
                    print(choice)
                    data = input("Write your data: 'item1' 'item2' 'item3' ... : ").split('\'')
                    filtered_data = list(filter(lambda item: not item.isspace() and len(item) > 0, data))
                    data = filtered_data
                    if choice == 'o':
                        print("Overwrite mode")
                        post[field] = data

                    else:
                        post[field] = post[field] + data
                        
                except Exception as err:
                    print(f'ERROR: {err}')
                    continue

            elif type(value) == bool:
                data = input("One way, or another... Decide, my Master: [t]/[f]").lower() == 't'
                post[field] = data

            else:
                print(f"Field of '{field}' is not editable from admin panel! Go to database software or create new entry to resolve this problem.")
            
            

        

            if input("Field updated successfully! Would you like to edit another one? [y]/[n]: ").lower() == 'y':
                continue
            else:
                post.save()
                return
    except KeyboardInterrupt:
        print("\nInterrupted. Going level up.")
        
def list_posts():
    for idx, post in enumerate(Post.objects()):
        print(f'{idx}. from {post.time}')

def sync_from_page():
    while(True):
        try:
            number = int(input('How many posts do you want to sync? (counting from latest, leave empty for all): '))
        except Exception as err:
            print(f'ERROR: {err}')
            continue
        else:
            break
    start_time = datetime.datetime.now()
    if number:
        post_list = scraper.get_posts_from_page(number_of_posts=number)
    else:
        post_list = scraper.get_posts_from_page(page_name='134arbitrium')
    for idx, post in enumerate(post_list):
        try:
            svc.create_post(
            text=post['text'],
            images_urls = post['images_lowquality'],
            video_url = post['video'],
            time = post['time']
            )
        except Exception as err:
            print(f'ERROR: {err}\nTraceback: {traceback.format_exc()}')
            return
        else:
            print(f'{idx}. post has been successfully synced.\nDate of publishment: {post["time"]}')

    else:
        end_time = datetime.datetime.now()
        print(f'{idx+1} posts have been successfully synced in {str(end_time-start_time)[5:]}.')


### UTILITIES ###
def get_key(val,my_dict):
    for key, value in my_dict.items():
         if val == value:
             return key
 
    return "key doesn't exist"
 
if __name__ == "__main__":
    main()