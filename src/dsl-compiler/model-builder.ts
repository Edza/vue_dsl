import {PraMod, PraModItem} from './common'

export class ModelBuilder {
    // member name: string
    readonly teamMemberPattern = /.*komandā[^']*'([^']*)'/

    // item id: number, item about: string
    readonly newItemPattern = /.*Jauna prasība[^']*'([^']*)'[^']*'([^']*)'/

    // is conflicting: string, is technical: string, progress: number
    readonly itemParamsPattern = /.*Parametri prasībai[^']*'([^']*)'[^']*'([^']*)'[^']*'([^']*)'/

    // item id: number,  responsible: string, assigned: string[]
    readonly itemTeamPattern = /.*Komandā prasībai[^']*'([^']*)'[^']*'([^']*)'[^']*'([^']*)'/

    // item id: number,  parent-item-id: number
    readonly itemSetParentPattern = /.*'([^']*)'[^']*ir zem[^']*'([^']*)'/

    // conditional constants
    readonly noconflicts = 'KONFLIKTU NAV'
    readonly conflicts = 'KONFLIKTU IR'
    readonly technical = 'TEHNISKĀ'
    readonly client = 'KLIENTA'

    readonly patterns : RegExp[] = [
      this.teamMemberPattern,
      this.newItemPattern,
      this.itemParamsPattern,
      this.itemTeamPattern,
      this.itemSetParentPattern,
    ];

    public BuildPraMod (text: string) {
      const praMod: PraMod = {
        members: [],
        items: []
      }

      // convention: team members always before items
      // items are all defined before the next item starts
      const lines = text.split('\n')

      for (let line of lines) {
        if (line.trim() === '') {
          continue
        }

        let matched = false

        for (let pattern of this.patterns) {
          const groups = pattern.exec(line)
          if (groups != null) {
            this.AddStatementToModel(praMod, pattern, groups)
            matched = true
            break
          }
        }

        if (!matched) {
          throw `no pattern matched the given line ${line}`
        }
      }

      return praMod
    }

    private AddStatementToModel (model: PraMod, rule: RegExp, values: RegExpExecArray) {
      switch (rule) {
        case this.teamMemberPattern: {
          // add a new team member
          model.members.push(values[1])
          break
        }
        case this.newItemPattern: {
          // we are beginning to build a new item
          model.items.push(new PraModItem(Number(values[1]), values[2]))
          break
        }
        case this.itemParamsPattern: {
          // set last updated parameters
          const itemInProgress = model.items[model.items.length - 1]
          itemInProgress.isConflicting = values[2] === this.conflicts
          itemInProgress.isTechnical = values[3] === this.technical
          itemInProgress.progress = Number(values[4]) / 100
          break
        }
        case this.itemTeamPattern: {
          // set last updated team
          const itemInProgress = model.items[model.items.length - 1]
          itemInProgress.responsible = values[2]
          itemInProgress.assigned = values[3].split(',').map(assigned => assigned.trim())
          break
        }
        case this.itemSetParentPattern: {
          // setting parent item for a child item
          this.AssignChildItemToParent(model, values)
          break
        }
        default: {
          throw 'parser rule is not defined!'
        }
      }
    }

    private AssignChildItemToParent (model: PraMod, values: RegExpExecArray) {
      // get last updated team
      const itemInProgress = model.items[model.items.length - 1]

      // to what do we assign?
      const targetId = Number(values[2])

      // remove last item from the tree as we will be assigning it someplace else
      model.items.splice(model.items.length - 1, 1)

      let isAssigned = false

      for (let item of model.items) {
        if (this.SetParentItemRecursive(item, targetId, itemInProgress)) {
          isAssigned = true
          break
        }
      }

      if (!isAssigned) {
        throw `Failed to set parent for item ${itemInProgress.id} to parent ${targetId}`
      }
    }

    private SetParentItemRecursive (node: PraModItem, targetId: number, newChild: PraModItem) : boolean {
      if (node.id === targetId) {
        node.items.push(newChild)
        return true
      }

      let result = false

      for (const item of node.items) {
        // if any child succeeds we all succeed
        result = result || this.SetParentItemRecursive(item, targetId, newChild)

        if (result) {
          break // need only first
        }
      }

      return result
    }
}
