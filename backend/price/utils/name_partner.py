import os

import vk

token = os.environ.get('VK_TOKEN')

def partner(id):
    api = vk.API(access_token=token, v='5.139')
    return api.users.get(user_ids=id, fields='photo_max')[0]


def groups(id):
    api = vk.API(access_token=token, v='5.139')
    return api.groups.getById(group_id=id, fields='members_count')['groups'][0]


def coverage(id):
    api = vk.API(access_token=token, v='5.139')
    data = api.wall.get(domain=id, offset=10, count=20)['items']
    count = 0
    for i in range(len(data)):
        post = data[i]
        count += post['views']['count']
    return count / len(data)
