export interface Exercise{
    id: number
    name: string
    type: string
    is_distance: boolean
}

export interface ExerciseLog{
    type: string
    id: number
    user: number
    exercise: Exercise
    duration: number
    distance: number
    description: string
    datetime: string
}


export interface ExerciseLogWrite{
    exercise: number
    duration: number
    distance?: number
    datetime: string
}