<script lang="ts">
import Vue from 'vue'
import type User from '@/types/User';

export default Vue.extend({
    props: {
        user: { type: Object as () => User },
        isLast: { type: Boolean, default: false }
    }
})

</script>

<template>
    <div class="user__container text--weight-light">
        <span v-if="isLast">and&nbsp;</span>
        <button class="user__button" type="button" @click.stop="$emit('display-user', $event)">
            <span>{{ user.fullName }}</span>
            <sup v-for="(aff, index) in user.affiliations" :key="'aff-' + index">
                {{ aff.index }}
            </sup>
        </button>
        <span v-if="!isLast">,&nbsp;</span>
    </div>
</template>

<style lang="scss" scoped>
.user__container {
    display: inline-flex;
    align-items: baseline;
    font-size: 15px;
    line-height: 22px;

    .user__button {
        border: 0;
        padding: 0;
        outline: none;
        cursor: pointer;
        background: transparent;
        color: #020202;

        sup {
            display: inline-block;
            text-align: left;
            margin-left: 1px;
        }

        span {
            text-decoration: underline;
        }
    }
}
</style>