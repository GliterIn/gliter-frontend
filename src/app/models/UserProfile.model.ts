import { User } from "./User.model";

export class UserProfile {
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
    constructor(
        name: string,
        profile_picture: string,
        cover_picture: string,
        location: string,
        birthday: Date,
        occupation: string,
        joined_on: Date,
        gender: string,
        relationship: string,
        bio: string,
        is_verified: boolean,
        is_admin: boolean,
        followers: User[],
        following: User[]) {
        this.name = name;
        this.profile_picture = profile_picture;
        this.cover_picture = cover_picture;
        this.location = location;
        this.birthday = birthday;
        this.occupation = occupation;
        this.joined_on = joined_on;
        this.gender = gender;
        this.relationship = relationship;
        this.bio = bio;
        this.is_verified = is_verified;
        this.is_admin = is_admin;
        this.followers = followers;
        this.following = following;
    }
}