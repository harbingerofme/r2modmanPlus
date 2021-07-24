import  { i18n } from 'src/boot/i18n';
import { TranslationRule } from '../../model/enums/TranslationRule';
import Tag from '../../model/translation/Tag';

class Rule {
    public type:TranslationRule;
    public tag:string;
    public formatOpen:string;
    public formatClose:string;

    public regexp:RegExp;

    constructor(name: TranslationRule, tag:string, openingFormat: string, closingFormat: string| null = null) {
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
        new Rule(TranslationRule.bold, "strong", "**"),
        new Rule(TranslationRule.code, "code", "`"),
    ]
    
    

    public static $tf(key:string) : Tag[] {
        let text = i18n.t(key) as string; 
        let elements = [new Tag(TranslationRule.span, text)];
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
