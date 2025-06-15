export interface Activity{
    id: string
    name: string
}

export interface Diary{
    id: number
    user: number
    title?: string
    content: string
    datetime: Date
    mood: string
    activities: Activity[]
    photo?: string
}