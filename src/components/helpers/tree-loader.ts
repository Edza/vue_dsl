import { PraMod } from '@/dsl-compiler/common'

export default class TreeLoader {
  public types : any = [
    {
      type: 'Tech',
      icon: 'far fa-hospital',
      max_children: 10,
      max_depth: 10,
    },
    {
      type: 'Client',
      icon: 'far fa-user',
      max_children: 10,
      max_depth: 10,
    },
  ]

  public process (model: PraMod): any {
    for (let item of model.items) {
      item.setTreeViewParametersRecursive()
    }

    return model.items
  }
}
