import { UserPrivacySetting } from "./UserPrivacySetting.model";
import { UserProfile } from "./UserProfile.model";

export class User{
    username: string;
    user_profile: UserProfile;
    user_privacy_settings: UserPrivacySetting;
    constructor(username: string, user_profile: UserProfile, user_privacy_settings: UserPrivacySetting){
        this.username = username;
        this.user_profile = user_profile;
        this.user_privacy_settings= user_privacy_settings;
    }
}