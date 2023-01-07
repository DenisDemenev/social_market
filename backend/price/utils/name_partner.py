import os
import vk

token = os.environ.get('VK_TOKEN')
def partner(id):
    api = vk.API(access_token=token, v='5.131')
    return api.users.get(user_ids=id, fields='photo_max')[0]
    


def groups(id):
    api = vk.API(access_token=token, v='5.131')
    return api.groups.getById(group_id=id, fields='members_count')[0]


