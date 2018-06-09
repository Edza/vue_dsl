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
// Komandā prasībai '1231' atbildīgais ir 'Jānis' un piešķirti ir '["Jānis", "Liene"]'.

// Jauna prasība '1232' 'Jāizveido DSL ģenerators'.
// Parametri prasībai '1232' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '0'%.
// Komandā prasībai '1232' atbildīgais ir 'Pēteris' un piešķirti ir '["Jānis", "Liene"]'.

//   Jauna prasība '1233' 'Jāizveido DSL atpakaļ ģenerātors'.
//   Parametri prasībai '1233' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '0'%.
//   Komandā prasībai '1233' atbildīgais ir 'Jānis' un piešķirti ir '["Jānis", "Liene"]'.
//   Prasība '1233' ir zem '1232'.

export interface PraMod {
  members: string[],
  items: PraModItem[]
}

export interface PraModItem {
  id: number,
  about: string,
  isConflicting: boolean,
  isText?: boolean,
  progress: number,
  responsible: string,
  assigned: string[]
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
        if (pattern.test(line)) {
          this.AddStatementToModel(praMod, pattern, pattern.exec(line))
          break
        }
      }

      throw `no pattern matched the given line ${line}`
    }

    return praMod
  }

  private AddStatementToModel (model: PraMod, rule: RegExp, values: RegExpExecArray | null) {

  }
}

export { Compiler }
