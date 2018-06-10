export interface CompilerResult {
  text: string;
  isErrorMsg: boolean;
}

class Compiler {
    greeting: string = '';

    translate (dslText: string): CompilerResult {
      this.greeting = dslText

      const result: CompilerResult = {
        text: 'Hello, ' + this.greeting,
        isErrorMsg: dslText.indexOf('?') !== -1,
      }

      if (result.isErrorMsg) {
        result.text = 'error' + result.text
      }

      return result
    }

    translateBack (genText: string): CompilerResult {
      this.greeting = genText

      const result: CompilerResult = {
        text: 'Hello2, ' + this.greeting,
        isErrorMsg: genText.indexOf('!') !== -1,
      }

      if (result.isErrorMsg) {
        result.text = 'error2' + result.text
      }

      return result
    }
}

// REGEX TO BE TESTED WITH THIS EXAMPLE

// Es gribu, lai manā komandā ir 'Jānis'.
// Un protams arī komandā ir jābūt 'Pēteris'.
// Kā arī komandā ir 'Liene'.

// Jauna prasība '1231' 'Jāizveido DSL likumi ar REGEXIEM'.
// Parametri prasībai '1231' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '50'%.
// Komandā prasībai '1231' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Liene'.

// Jauna prasība '1232' 'Jāizveido DSL ģenerators'.
// Parametri prasībai '1232' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '0'%.
// Komandā prasībai '1232' atbildīgais ir 'Pēteris' un piešķirti ir 'Jānis, Liene'.

//   Jauna prasība '1233' 'Jāizveido DSL atpakaļ ģenerātors'.
//   Parametri prasībai '1233' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '0'%.
//   Komandā prasībai '1233' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Liene'.
//   Prasība '1233' ir zem '1232'.

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

class RegexBuilder {
  // member name: string
  readonly teamMemberPattern = /.*komandā[^']*'([^']*)'/

  // item id: number, item about: string
  readonly newItemPattern = /.*Jauna prasība[^']*'([^']*)'[^']*'([^']*)'/

  // is conflicting: string, is technical: string, progress: number
  readonly itemParamsPattern = /.*Parametri prasībai[^']*'([^']*)'[^']*'([^']*)'[^']*'([^']*)'/

  // item id: number,  responsible: string, assigned: string[]
  readonly itemTeamPattern = /.*Komandā prasībai[^']*'([^']*)'[^']*'([^']*)'[^']*'([^']*)'/

  // item id: number,  parent-item-id: number
  readonly itemSetParentPattern = /.*Jauna prasība[^']*'([^']*)'[^']*'([^']*)'/

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

  BuildPraMod (text: string) {
    const praMod: PraMod = {
      members: [],
      items: []
    }

    // convention: team members always before items
    // items are all defined before the next item starts
    const lines = text.split('\r\n')

    for (let line of lines) {
      if (line.trim() === '') {
        continue
      }

      for (let pattern of this.patterns) {
        const groups = pattern.exec(line)
        if (groups != null) {
          this.AddStatementToModel(praMod, pattern, groups)
          break
        }
      }

      throw `no pattern matched the given line ${line}`
    }

    return praMod
  }

  private AddStatementToModel (model: PraMod, rule: RegExp, values: RegExpExecArray) {
    if (rule === this.teamMemberPattern) {
      // add a new team member
      model.members.push(values[1])
    }

    if (rule === this.newItemPattern) {
      // we are beginning to build a new item
      model.items.push(new PraModItem(Number(values[1]), values[2]))
    }

    if (rule === this.itemParamsPattern) {
      // set last updated parameters
      const itemInProgress = model.items[model.items.length - 1]
      itemInProgress.isConflicting = values[2] === this.noconflicts
      itemInProgress.isTechnical = values[3] === this.technical
      itemInProgress.progress = Number(values[4]) / 100
    }

    if (rule === this.itemTeamPattern) {
      // set last updated team
      const itemInProgress = model.items[model.items.length - 1]
      itemInProgress.responsible = values[2]
      itemInProgress.assigned = values[3].split(',').map(assigned => assigned.trim())
    }

    if (rule === this.itemSetParentPattern) {
      // get last updated team
      const itemInProgress = model.items[model.items.length - 1]

      // to what do we assign?
      const targetId = Number(values[2])

      // remove last item from the tree as we will be assigning it someplace else
      model.members.splice(model.items.length - 1, 1)

      let isAssigned = false

      for (let item of model.items) {
        if (this.SetItemParentRecursive(item, targetId, itemInProgress)) {
          isAssigned = true
          break
        }
      }

      if (!isAssigned) {
        throw `Failed to set parent for item ${itemInProgress.id} to parent ${targetId}`
      }
    }
  }

  private SetItemParentRecursive (node: PraModItem, targetId: number, newChild: PraModItem) : boolean {
    if (node.id === targetId) {
      node.items.push(newChild)
      return true
    }

    let result = false

    for (const item of node.items) {
      // if any child succeeds we all succeed
      result = result || this.SetItemParentRecursive(item, targetId, newChild)
    }

    return result
  }
}

export { Compiler }
