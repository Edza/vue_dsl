// prasības
// -id
// -apraksts(>=10)
// -tips: klienta|tehniskās

// vecāka prasība (ja klienta, tad vecāks nevar būt tehnisks)
// obligātais bērns tehniskā kautkur ķēdē (ja klienta)
// obligātais vecāks tehniskajai kautkur uz augšu ir klienta

// var būt konfliktējošas (izpildāma tikai viena no vairākām līmeni)
// klienta nedrīkst konfliktēt ar tehniskajām

// katrai lapai ir progress no 0 lidz 100
// pārējām to rēķina kā videjo no bērnu progressa
// starp konfliktējošām nenulles progress drīkst būt tikai 10

// - atbildīgais
// - 1+ izpildītāji

// izstrādes komandas locekļus

import {PraMod, PraModItem} from './common'

interface ModelValidatorRule {
    (model: PraMod): boolean;
};

interface ItemValidatorRule {
    (item: PraModItem, context: ModelValidator): boolean;
};

export class ModelValidator {
    itemRules: ItemValidatorRule[] = [
      this.itemMustHaveResponsible,
      this.itemMustHaveAssigned,
    ]

    modelRules: ModelValidatorRule[] = [
      this.cantHaveRootTechnical,
    ]

    public ValidatePraMod (model: PraMod): boolean {
      // run model validators
      for (let modelRule of this.modelRules) {
        modelRule(model)
      }

      // do dfs call all rules on each item
      for (let itemRule of this.itemRules) {
        for (let topItem of model.items) {
          this.validateRecursive(topItem, itemRule, this)
        }
      }

      return true
    }

    private validateRecursive (item: PraModItem, itemRule: ItemValidatorRule, context: ModelValidator): boolean {
      for (let children of item.children) {
        this.validateRecursive(children, itemRule, context)
      }

      return itemRule(item, context)
    }

    private itemMustHaveResponsible (item: PraModItem, context: ModelValidator): boolean {
      if (!item.responsible) {
        context.throwItemError(item, 'does not have responsible team member')
      }

      return true
    }

    private itemMustHaveAssigned (item: PraModItem, context: ModelValidator): boolean {
      if (item.assigned.length === 1 && item.assigned[0].trim() === '') {
        context.throwItemError(item, 'does not have assigned team members')
      }

      return true
    }

    private throwItemError (item: PraModItem, rule: string) {
      throw `validator error for ${item.id} - ${rule}`
    }

    private cantHaveRootTechnical (model: PraMod): boolean {
      for (let item of model.items) {
        if (item.isTechnical) {
          throw "model can't have root technical"
        }
      }

      return true
    }
}
