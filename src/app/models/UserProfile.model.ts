export interface UserProfile {
    uid: string;
    username: string;
    email: string;
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
    is_onboarded: boolean;
    private_account: boolean;
}