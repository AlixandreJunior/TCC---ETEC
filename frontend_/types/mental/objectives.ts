import { Activity } from "./diary"

export interface Objective{
    id: number
    user: number
    activity: Activity
    deadline: string
    created_at: string
}

export interface ObjectiveWrite{
    activity: number
    period: '1w'|'2w'|'3w'
}