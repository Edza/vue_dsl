import {PraModItem, PraMod} from './common'
import { ModelBuilder } from './model-builder'

export interface CompilerResult {
  text: string;
  isErrorMsg: boolean;
  model: PraMod
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
        model: builderResult
      }

      // TODO: call model validator

      return result
    }
}

export { Compiler }
