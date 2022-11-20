# System Design


## Data Models
```
User{
    username: string;
    user_profile: UserProfile;
    user_privacy_settings: UserPrivacySetting;
}
```

```
UserProfile {
    name: string;
    profile_picture: string;
    cover_picture: string;
    location: string;
    birthday: Date;
    occupation: string;
    joined_on: Date;
    gender: string;
    relationship: string;
    bio: string;
    is_verified: boolean;
    is_admin: boolean;
    followers: User[];
    following: User[];
}
```

```
UserPrivacySetting{
    allow_pymk_to_everyone: boolean;
    allow_pymk_to_2nd_degree: boolean;
}
```
```
Reaction {
    ReactionTypes {
        Like,
        Comment,
    }
    type: ReactionTypes;
    username: string;
    content: string;
    post_id: number;
}
```

```
Post {
    id: number;
    likes: Reaction[];
    comments: Reaction[];
    timestamp: Date;
    content: string;
    is_visible: boolean;
}
```


### APIs

TODO([@s-i-d-d-i-s](https://github.com/s-i-d-d-i-s))
