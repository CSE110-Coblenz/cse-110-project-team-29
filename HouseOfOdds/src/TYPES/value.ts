export type value = {
    number: number,
    color: string
}

export type result = {
    payout: number,
    won: boolean
}

export type condition = {
    number: 'Even' | 
    'Odd' |
    'Greater than 19' |
    'Less than 19';
    color: 'Red' |
    'Black' |
    'Green';
}