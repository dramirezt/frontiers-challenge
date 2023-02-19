import type Affiliation from './Affiliation'

export default interface User {
    id: number,
    fullName: string,
    role: string,
    publications: number,
    views: number,
    followers: number,
    pictureUrl: string,
    profileUrl: string,
    affiliations: Array <Affiliation>
}