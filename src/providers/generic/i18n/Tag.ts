import { RuleEnum } from "./RuleEnum";

export default class Tag {
    public type:RuleEnum ;
    public text:string;
   constructor(type:RuleEnum, text:string){
        this.text = text;
        this.type = type;
   }
}