import type UserData from './userInterface';

export interface PostData {
    _id : string
    title : string
    description : string
    topics : string[]
    author : UserData
    likes : string[]
}