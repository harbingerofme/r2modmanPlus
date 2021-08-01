import { i18n } from 'src/boot/i18n';
import { TranslationRule } from '../../model/enums/TranslationRule';
import Tag from '../../model/translation/Tag';

class Rule {
    public type: TranslationRule;
    public formatOpen: string;
    public formatClose: string;

    public regexp: RegExp;

    constructor(
        type: TranslationRule,
        openingFormat: string,
        closingFormat: string | null = null
    ) {
        this.type = type;
        this.formatOpen = openingFormat;
        this.formatClose = closingFormat || openingFormat;

        this.regexp = new RegExp(
            `(?:${this.escapeRegex(this.formatOpen)})([^(?:${this.escapeRegex(
                this.formatOpen
            )})|(?:${this.escapeRegex(
                this.formatClose
            )})].*?)(?:${this.escapeRegex(this.formatClose)})`,
            'gi'
        );
    }

    //Source: https://stackoverflow.com/a/3561711
    //License: https://creativecommons.org/licenses/by-sa/4.0/
    protected escapeRegex(str: string) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
}

class SingleTagRule extends Rule {
    constructor(type: TranslationRule, format: string) {
        super(type, format);

        this.regexp = new RegExp(`${this.escapeRegex(this.formatOpen)}`, 'gi');
    }
}

export default class Formatter {
    private static rules: Rule[] = [
        //Match discord markdown
        new Rule(TranslationRule.bold, '**'),
        new Rule(TranslationRule.code, '`'),
        new SingleTagRule(TranslationRule.newline, '\n'),
    ];

    public static $tf(key: string, args?: string[]): Tag[] {
        let text: string;
        if (args) {
            text = i18n.t(key, args) as string;
        } else {
            text = i18n.t(key) as string;
        }
        let elements = [new Tag(TranslationRule.span, text)];
        Formatter.rules.forEach(rule => {
            let copy: Tag[] = [];
            elements.forEach(tag => {
                let matches = [...tag.text.matchAll(rule.regexp)];
                matches.forEach(match => {
                    let index = tag.text.indexOf(match[0]);
                    let pretext = tag.text.slice(0, index);
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
