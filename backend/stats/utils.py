import os

import vk

token = os.environ.get('VK_TOKEN'),


def release_date(id):
    api = vk.API(access_token=token, v='5.131')
    post = api.wall.getById(posts=id)
    if (len(post) > 0):
        return post[0]
    return None
