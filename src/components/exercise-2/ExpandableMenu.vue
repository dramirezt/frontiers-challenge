<script setup lang="ts">
import ExpandableMenu from './ExpandableMenu.vue'
import { computed, ref, onMounted, watch } from 'vue'
import type Menu from '@/types/Menu'

interface Props {
    menuTree: Menu,
    forceClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    forceClose: false
})

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
    <div class="menu" :class="{ 'expanded': isExpanded && menuTree.submenu.length }">
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
