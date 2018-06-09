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

export interface CompilerResult {
    text: string;
    isErrorMsg: boolean;
}

export { Compiler }
