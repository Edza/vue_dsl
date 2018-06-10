export class PraModItem {
    id: number
    about: string
    isConflicting: boolean = false
    isTechnical: boolean = false
    progress: number = 0
    responsible: string = ''
    assigned: string[] = []
    items: PraModItem[] = []

    constructor (id: number, about: string) {
      this.id = id
      this.about = about
    }
}

export interface PraMod {
    members: string[],
    items: PraModItem[]
}
