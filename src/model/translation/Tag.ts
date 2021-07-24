import { TranslationRule } from "../enums/TranslationRule";

export default class Tag {
     public type: TranslationRule;
     public text: string;
     
     constructor(type: TranslationRule, text: string){
          this.text = text;
          this.type = type;
     }
}