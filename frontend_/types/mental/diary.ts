export interface Activity{
    id: number
    name: string
}

export type MoodType = "Excelente" | "Bom" | "Neutro" | "Ruim" | "Péssimo";

export interface Diary{
    id: number
    user: number
    title: string
    content: string
    datetime: Date
    mood: MoodType
    activities: Activity[]
    photo?: string
}

export interface DiaryWrite{
    title: string
    content: string
    datetime: Date
    mood: MoodType
    activities: number[]
    photo?: string
}