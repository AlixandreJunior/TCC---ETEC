export interface Mindfulness{
    id: number
    name: string
    type: string
}

export interface MindfulnessLog{
    id: number
    user: number
    mindfulness: number
    duration: number
    description: string
    datetime: Date
}