import { PraModItem, PraMod } from './common'
import { ModelBuilder } from './model-builder'
import { ModelValidator } from './model-validator'

export interface CompilerResult {
  text: string;
  isErrorMsg: boolean;
  model: PraMod
}

class Compiler {
    readonly builder = new ModelBuilder()
    readonly validator = new ModelValidator()

    translate (dslText: string): CompilerResult {
      let builderResult
      let isError = false

      try {
        builderResult = this.builder.BuildPraMod(dslText)
        this.validator.ValidatePraMod(builderResult)
      } catch (ex) {
        isError = true
        builderResult = ex
      }

      const result: CompilerResult = {
        text: isError ? builderResult : JSON.stringify(builderResult, null, 2),
        isErrorMsg: isError,
        model: builderResult
      }

      return result
    }
}

export { Compiler }
