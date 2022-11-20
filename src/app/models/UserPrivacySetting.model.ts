import { User } from "./User.model";

export class UserPrivacySetting{
    allow_pymk_to_everyone: boolean;
    allow_pymk_to_2nd_degree: boolean;
    constructor(allow_pymk_to_everyone: boolean, allow_pymk_to_2nd_degree: boolean){
        this.allow_pymk_to_everyone = allow_pymk_to_everyone;
        this.allow_pymk_to_2nd_degree = allow_pymk_to_2nd_degree;
    }
}