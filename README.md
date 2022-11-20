# System Design


## Data Models

```
UserProfile:
    - User = OneToOneField(User, on_delete=models.CASCADE)
	- name = CharField(max_length=50,default="")
	- profile_picture = URLField(default='https://i.ibb.co/BfG7gZ8/default-profile-picture.jpeg')
	- cover_picture = URLField(default='https://i.ibb.co/bzHYH9f/default-banner.jpg')
	- location = CharField(max_length=50,default='')
	- birthday = DateField()
	- occupation = CharField(max_length=50,default='')
	- joined_on = DateField(default=datetime.date.today)
	- gender = CharField(max_length=50,default='')
	- relationship = CharField(max_length=50,default='')
	- bio = CharField(max_length=256,default='')
	- is_verified = BooleanField(default=False)
	- is_admin = BooleanField(default=False)
	- followers = ManyToManyField(User, related_name='followers')
	- following = ManyToManyField(User, related_name='following')
```

```
Post:
	- likes = ManyToManyField(User)
	- user = ForeignKey(UserProfile, on_delete=models.CASCADE)
	- timestamp = DateTimeField(auto_now_add=False, default=False)
	- content = CharField(max_length=256,default='')
	- is_visible = BooleanField(default=True)
```
```
UserPrivacySetting:
	- User = OneToOneField(User, on_delete=models.CASCADE)
	- allow_pymk_to_everyone = BooleanField(default=False)
	- allow_pymk_to_2nd_degree= BooleanField(default=False)
```


### APIs

TODO(@s-i-d-d-i-s)
