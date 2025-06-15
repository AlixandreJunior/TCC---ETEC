export interface User{
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    password: string
    created_at: Date
}

export interface Goal{
    user: number
    hydration_goal: number
    steps_goal: number
    exercise_goal: number
    mindfulness_goal: number
}