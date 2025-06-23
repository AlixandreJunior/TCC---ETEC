import { Activity } from "./diary"

export interface Objective{
    id: number
    user: number
    activity: Activity
    deadline: string
    created_at: string
}