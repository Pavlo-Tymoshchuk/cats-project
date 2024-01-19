import { Breed } from '../dto/catsTypes'

export const createCatTitle = (breeds: Breed[] | undefined) => {
    if (!breeds?.length) {
        return 'Cute cats'
    }

    return breeds.map((b) => b.name).join(',')
}