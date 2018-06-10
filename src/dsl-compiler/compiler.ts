import {PraModItem, PraMod} from './common'
import { ModelBuilder } from './model-builder'

export interface CompilerResult {
  text: string;
  isErrorMsg: boolean;
}

class Compiler {
    readonly builder = new ModelBuilder()

    translate (dslText: string): CompilerResult {
      let builderResult
      let isError = false

      try {
        builderResult = this.builder.BuildPraMod(dslText)
      } catch (ex) {
        isError = true
        builderResult = ex
      }

      const result: CompilerResult = {
        text: isError ? builderResult : JSON.stringify(builderResult, null, 2),
        isErrorMsg: isError,
      }

      // TODO: call model validator

      return result
    }

    // TODO: refactor into tree viewer
    translateBack (genText: string): CompilerResult {
      // this.greeting = genText

      const result: CompilerResult = {
        text: 'Hello2, ',
        isErrorMsg: genText.indexOf('!') !== -1,
      }

      // if (result.isErrorMsg) {
      //   result.text = 'error2' + result.text
      // }

      return result
    }
}

export { Compiler }
