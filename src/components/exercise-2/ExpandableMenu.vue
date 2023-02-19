<script setup lang="ts">
import ExpandableMenu from './ExpandableMenu.vue'
import { computed, ref, onMounted, watch } from 'vue'

interface Menu {
    title: String,
    submenu: Array<Menu>
}

const props = defineProps<{
    menuTree: Menu,
    forceClose: boolean
}>()

const isExpanded = ref(false)
const submenu = ref<HTMLElement | null>(null)
const submenuHeight = ref('0px')
const hasSubmenu = computed((): boolean => { return props.menuTree.submenu.length > 0 })

function getSubmenuHeight(): void {
    if (submenu.value) {
        let height: number = 0

        const contentChildren: Array<HTMLElement> = submenu.value.children as unknown as HTMLElement[]

        Array.from(contentChildren).forEach((c: HTMLElement) => {
            const childHeight: number = c.offsetHeight
            const childMarginTop: number = parseInt(getComputedStyle(c).marginTop)
            const childMarginBottom: number = parseInt(getComputedStyle(c).marginBottom)

            height += childHeight + childMarginTop + childMarginBottom
        })

        submenuHeight.value = height + 'px'
        submenu.value.style.height = isExpanded.value ? submenuHeight.value : '0px'
    }
}

function handleOpen(submenuHeight: number) {
    emit('toggle', submenuHeight)
    if (submenu.value) {
        submenu.value.style.height = submenu.value?.getBoundingClientRect().height + submenuHeight + 'px'
    }
}

function toggleMenu(): void {
    isExpanded.value = !isExpanded.value
    if (isExpanded.value) {
        emit('toggle', parseInt(submenuHeight.value))
    }
    else if (submenu.value) {
        emit('toggle', submenu.value?.getBoundingClientRect().height * -1)
    }

    if (submenu.value) {
        submenu.value.style.height = isExpanded.value ? submenuHeight.value : '0px'
    }
}

const emit = defineEmits<{
    (e: 'toggle', value: number): void
}>()

watch(() => props.forceClose, (value) => {
    if (value) {
        isExpanded.value = false

        if (submenu.value) {
            submenu.value.style.height = '0px'
        }
    }
})

onMounted(() => {
    getSubmenuHeight()
})

</script>

<template>
    <div class="menu" :class="{ 'expanded': isExpanded && menuTree.submenu }">
        <div class="menu__title" @click="toggleMenu">
            {{ menuTree.title }}

            <span class="icon" v-if="hasSubmenu"></span>
        </div>

        <div class="submenu" v-if="hasSubmenu" ref="submenu">
            <div v-for="(element, index) in menuTree.submenu" :key="'menu-' + index">
                <ExpandableMenu :menu-tree="element" :force-close="!isExpanded" @toggle="handleOpen($event)" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    width: 400px;
    display: flex;
    flex-direction: column;

    &.expanded {
        >.menu__title {
            span {
                &::after {
                    transform: translate(0, -50%) rotate(0deg);
                }
            }
        }
    }
}

.menu__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 40px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #000;

    span {
        width: 15px;
        height: 2px;
        background-color: #000;
        position: relative;

        &::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            transition: all 0.3s ease-in-out;
            transform: translate(0, -50%) rotate(90deg);
            width: 100%;
            height: 2px;
            background-color: #000;
        }
    }
}

.submenu {
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &.expanded {
        height: auto;
    }
}
</style>