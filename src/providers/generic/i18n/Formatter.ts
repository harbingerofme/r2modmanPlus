import Vue from 'vue'
import  { i18n } from 'src/boot/i18n';
import { RuleEnum } from './RuleEnum';
import Tag from './Tag';

class Rule {
    public type:RuleEnum;
    public tag:string;
    public formatOpen:string;
    public formatClose:string;

    public regexp:RegExp;

    constructor(name: RuleEnum, tag:string, openingFormat: string, closingFormat: string| null = null) {
        this.type = name;
        this.tag = tag;
        this.formatOpen = openingFormat;
        this.formatClose = closingFormat||openingFormat;

        this.regexp = new RegExp(`(?:${this.escapeRegex(this.formatOpen)})([^(?:${this.escapeRegex(this.formatOpen)})|(?:${this.escapeRegex(this.formatClose)})].*?)(?:${this.escapeRegex(this.formatClose)})`, "gi");
    }

    //Source: https://stackoverflow.com/a/3561711
    //License: https://creativecommons.org/licenses/by-sa/4.0/
    private escapeRegex(str: string) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
}

export default class Formatter {
    private static rules: Rule[] = [
        //Match discord markdown
        new Rule(RuleEnum.bold, "strong", "**"),
        new Rule(RuleEnum.code, "code", "`"),
    ]
    
    

    public static $tf(key:string) : Tag[] {
        let text = i18n.t(key) as string; 
        let elements = [new Tag(RuleEnum.span, text)];
        Formatter.rules.forEach( rule=> {
            let copy: Tag[] = [];
            elements.forEach(tag => {
                let matches = [...tag.text.matchAll(rule.regexp)];
                matches.forEach(match=>{
                    let index = tag.text.indexOf(match[0]);
                    let pretext = tag.text.slice(0,index);
                    tag.text = tag.text.slice(index + match[0].length);
                    copy.push(new Tag(tag.type, pretext));
                    copy.push(new Tag(rule.type, match[1]));
                });
                copy.push(tag);
            });
            elements = copy;            
        });
        return elements;
    }

}

