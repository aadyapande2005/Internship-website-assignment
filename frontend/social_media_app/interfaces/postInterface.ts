import type UserData from './userInterface';

export interface PostData {
    _id : string
    title : string
    images : [string]
    description : string
    author : UserData
    likes : [string]
}