<template>
    <span :id="'t-'+translationKey">
        <span v-for="(tag,index) in tags" :key="index">
            <strong v-if="tag.type === TranslationRule.bold">
                {{ tag.text }}
            </strong>
            <code v-else-if="tag.type === TranslationRule.code">
                {{ tag.text }}
            </code>
            <br v-else-if="tag.type === TranslationRule.newline" />
            <span v-else>
                {{ tag.text }}
            </span>
        </span>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import Tag from '../model/translation/Tag'
import Formatter from '../r2mm/translation/Formatter';
import {TranslationRule} from '../model/enums/TranslationRule';

@Component
export default class Translation extends Vue {
    @Prop({default: ''})
    translationKey?: string

    @Prop({default: [] })
    arguments?: string[];

    private tags?: Tag[];
    private TranslationRule: any = TranslationRule

    created(){
        this.tags = Formatter.$tf(this.translationKey as string, this.arguments);
    }
}
</script>
