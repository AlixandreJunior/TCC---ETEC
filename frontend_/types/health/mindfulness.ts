export interface Mindfulness{
    id: number
    name: string
    type: string
}

export interface MindfulnessLog{
    id: number
    user: number
    mindfulness: Mindfulness
    duration: number
    description: string
    datetime: string
}

export interface MindfulnessLogWrite{
    mindfulness: number
    duration: number
    datetime: string
}