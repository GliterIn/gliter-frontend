
export enum ReactionTypes {
    Like,
    Comment,
}
export interface Reaction {
    type: ReactionTypes;
    username: string;
    content: string;
    post_id: number;

}