import { UserProfile } from "./UserProfile.model";

export interface RequestBase{
    uid: string;
    user_token : string;
    user: UserProfile;
}

export interface UserList{
    hidden: boolean,
    users: UserProfile[]
}