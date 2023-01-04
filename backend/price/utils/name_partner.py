import vk
token = 'vk1.a.jombWmalPETF6clfQV9IKOdtRtdcWjxakRyXKVl9Q2rFxqq4zv-vlQn9w_EZKrp0httZLTjZlLdW_mBYirbxRxZc0iDhEu98zjYclDpLT736iwGA176UwCjD2z7nK1eTdALOIRVvVutfXj7IN0Qs3hI3wo3Ek2JjdGq7fFGd5L5bA6_XqLxB97ZHoIay-8ue_-csQZqPOBUFV8QPbqTbHQ'
def partner(id):
    api = vk.API(access_token=token, v='5.131')
    return api.users.get(user_ids=id, fields='photo_max')[0]
    


def groups(id):
    api = vk.API(access_token=token, v='5.131')
    return api.groups.getById(group_id=id, fields='members_count')[0]


