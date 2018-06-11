// import { Tree, TreeNode } from 'vue-tree-list'

import { PraMod } from '@/dsl-compiler/common'

export default class TreeLoader {
  public process (model: PraMod): any {
    for (let item of model.items) {
      item.setParametersRecursive()
    }

    return model.items
  }
}
