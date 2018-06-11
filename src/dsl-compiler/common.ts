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
      this.type = this.isTechnical ? 'Tech' : 'Client'

      if (this.children.length === 0) {
        this.assignTextParameters()
        return this.progress
      } else {
        let progressSum: number = 0

        for (let child of this.children) {
          progressSum += child.setTreeViewParametersRecursive()
        }

        this.progress = progressSum / this.children.length
        this.assignTextParameters()
        return this.progress
      }
    }

    private assignTextParameters () {
      this.text = `${this.id}: ${this.about} | ${Math.round(this.progress * 100)}%`

      this.description = `${this.id}: ${this.about} | ${Math.round(this.progress * 100)}%\r\n`
      this.description += `TEHNISKĀ: ${this.isTechnical ? 'JĀ' : 'NĒ'}, KONFLIKTĒJOŠA: ${this.isConflicting ? 'JĀ' : 'NĒ'}\r\n`
      this.description += `ATBILDĪGS: ${this.responsible}, KOMANDA: ${this.assigned.join(', ')}`
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
