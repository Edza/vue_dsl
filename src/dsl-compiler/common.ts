export class PraModItem {
    id: number
    about: string
    progress: number = 0
    isConflicting: boolean = false
    isTechnical: boolean = false
    responsible: string = ''
    assigned: string[] = []
    children: PraModItem[] = []

    // for tree-view
    text = ''
    description = ''
    opened = true
    type = ''

    public setTreeViewParametersRecursive () {
      this.text = `${this.id}: ${this.about} | PROGRESS: ${Math.round(this.progress * 100)}%`

      this.description = `${this.id}: ${this.about} | PROGRESS: ${Math.round(this.progress * 100)}%\r\n`
      this.description += `TEHNISKĀ: ${this.isTechnical ? 'JĀ' : 'NĒ'}, KONFLIKTĒJOŠA: ${this.isConflicting ? 'JĀ' : 'NĒ'}\r\n`
      this.description += `ATBILDĪGS: ${this.responsible}, KOMANDA: ${this.assigned.join(', ')}`

      this.type = this.isTechnical ? 'Tech' : 'Client'

      for (let child of this.children) {
        child.setTreeViewParametersRecursive()
      }
    }

    constructor (id: number, about: string) {
      this.id = id
      this.about = about
    }
}

export interface PraMod {
    members: string[],
    items: PraModItem[]
}
