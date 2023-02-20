<script lang="ts">
import Vue from 'vue'
import IconChevron from '@/components/exercise-1/icons/IconChevron.vue'

export default Vue.extend({
    components: {
        IconChevron
    },
    props: {
        title: { type: String, default: 'List title' }
    },
    data() {
        return {
            isExpanded: <boolean>(false),
            contentHeight: <string>('0px'),
            resizeObs: <ResizeObserver | undefined>(undefined)
        }
    },
    methods: {
        getContentHeight(): void {
            let height: number = 0

            const content: HTMLElement = this.$refs.content as HTMLElement
            const contentChildren: Array<HTMLElement> = content.children as unknown as HTMLElement[]

            Array.from(contentChildren).forEach((c: HTMLElement) => {
                const childHeight: number = c.offsetHeight
                const childMarginTop: number = parseInt(getComputedStyle(c).marginTop)
                const childMarginBottom: number = parseInt(getComputedStyle(c).marginBottom)

                height += childHeight + childMarginTop + childMarginBottom
            })

            this.contentHeight = height + 'px'
            content.style.height = this.isExpanded ? this.contentHeight : '0px'
        },
        setup(): void {
            this.getContentHeight()

            /**
             * ResizeObserver to update content div height element width changes of element width
             */
            this.resizeObs = new ResizeObserver(() => {
                this.getContentHeight()
            })
            this.resizeObs.observe(this.$el)
        }
    },
    watch: {
        isExpanded(value): void {
            const content: HTMLElement = this.$refs.content as HTMLElement
            content.style.height = value ? this.contentHeight : '0px'
        }
    },
    beforeDestroy() {
        if (this.resizeObs) {
            this.resizeObs.unobserve(this.$el)
        }
    },
    mounted() {
        this.setup()
    }
})
</script>

<template>
    <div class="list">
        <div class="list__title text--color-primary">
            <button class="list__button text--color-primary" type="button" @click="isExpanded = !isExpanded">
                {{ title }}
                <IconChevron class="list__button__icon" :class="{ 'rotate': isExpanded }" />
            </button>
        </div>
        <div class="list__content" ref="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list {
    margin: 8px 0;
}
.list__button {
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;

    .list__button__icon {
        margin-left: 5px;
        transform: rotate(180deg);
        transition: all 0.3s ease-in-out;

        &.rotate {
            transform: rotate(0);
        }
    }
}

.list__content {
    overflow: hidden;
    transition: height 0.3s ease-in-out;

    >div::first-child {
        margin-top: 5px;
    }
}
</style>