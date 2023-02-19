import type User from './User'

export default interface Paper {
    type: string,
    title: string,
    journal: string
    section: string,
    editor: User,
    yourself: User,
    authors: Array <User>
}