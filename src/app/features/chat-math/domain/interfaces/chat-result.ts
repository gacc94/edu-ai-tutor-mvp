export interface UserContextResult {
    creditsRemaining: number;
    plan: string;
}

export interface ChatResult {
    type: string;
    solutionText: string;
    solutionImage?: string[];
    userContext: UserContextResult;
}
