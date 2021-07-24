<template>
    <span>
        <span v-for="(tag,index) in tags" :key="index">
            <strong v-if="tag.type === RuleEnum.bold">
                {{ tag.text }}
            </strong>
            <code v-else-if="tag.type === RuleEnum.code">
                {{ tag.text }}
            </code>
            <span v-else>
                {{ tag.text }}
            </span>
        </span>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import Tag from '../providers/generic/i18n/Tag'
import Formatter from '../providers/generic/i18n/Formatter';
import {RuleEnum} from '../providers/generic/i18n/RuleEnum';

@Component
export default class Translation extends Vue {
    @Prop({default: ''})
    translationKey: string | undefined

    private tags:Tag[]|undefined;
    private RuleEnum: any = RuleEnum

    created(){
        console.log('aaaa');
        this.tags = Formatter.$tf(this.translationKey as string);
    }

}
</script>
