<script lang="ts">
import Vue from 'vue'
import IconDocument from '@/components/exercise-1/icons/IconDocument.vue'
import IconDocumentCheck from '@/components/exercise-1/icons/IconDocumentCheck.vue'

export default Vue.extend({
    components: {
        IconDocument,
        IconDocumentCheck
    },
    props: {
        extraAnimationDelay: { type: Number, default: 0}
    },
    data() {
        return {
            animationBaseDelay: <number>(450)
        }
    },
    methods: {
        animateCheckboxIcon(): void {
            const icon: HTMLElement = this.$el.children[this.$el.children.length - 1] as HTMLElement
            const lastDocumentCheckmark = icon.querySelectorAll('.check') as unknown as Array<HTMLElement>

            setTimeout(() => {
                lastDocumentCheckmark.forEach((c) => {
                    c.style.transform = 'translateX(45%)'
                    c.style.opacity = '1'

                    setTimeout(() => {
                        c.style.filter = 'grayscale(0)'
                    }, this.animationBaseDelay)
                })
            }, this.animationBaseDelay)
        },
        animateDocumentIcon(): void {
            const element: HTMLElement = this.$el as HTMLElement
            const children = element.children as unknown as HTMLElement[]

            element.classList.add('animate')

            Array.from(children).forEach((e: HTMLElement, index: number) => {
                const x: string = -60 + (10 * index) + '%'
                const y: string = 40 - (20 * index) + '%'
                setTimeout(() => {
                    e.style.transform = 'translate(' + x + ', ' + y + ')'

                    // If last icon, toggle checkmark animation
                    if (index + 1 == children.length) {
                        this.animateCheckboxIcon()
                    }
                }, this.animationBaseDelay * (index + 1))
            })
        }
    },
    mounted() {
        setTimeout(this.animateDocumentIcon, this.animationBaseDelay + this.extraAnimationDelay)
    }
})
</script>

<template>
    <div class="icon__container">
        <IconDocument class="icon" />
        <IconDocument class="icon" />
        <IconDocumentCheck class="icon" />
    </div>
</template>

<style lang="scss" scoped>
.icon__container {
    position: relative;
    height: 61px;
    width: 83px;
    overflow: hidden;

    &::after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        content: "";
        height: 3px;
        width: 0;
        background-color: #020202;
    }

    &.animate {
        &::after {
            width: 100%;
            animation: line-expand 0.6s ease-in-out;
        }
    }

    .icon {
        position: absolute;
        top: 0;
        left: 50%;
        transition: all 0.6s ease-in-out;

        @for $i from 1 through 3 {
            &:nth-child(#{$i}) {
                transform: translate(-60% + (10* ($i - 1)), 100%);
            }
        }

        ::v-deep {
            .check {
                transition: all 0.6s ease-in-out;
                transform: translateX(100%);
                filter: grayscale(1);
                opacity: 0;
            }
        }
    }
}

@keyframes line-expand {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}
</style>