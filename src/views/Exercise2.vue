<script setup lang="ts">
import ExpandableMenu from '@/components/exercise-2/ExpandableMenu.vue';

const menuTree = {
    title: 'Menu Root',
    submenu: [
        {
            title: 'Menu 1',
            submenu: [
                {
                    title: 'Menu 1-1',
                    submenu: [
                        {
                            title: 'Menu 1-1-1',
                            submenu: [
                                {
                                    title: 'Menu 1-1-1-1',
                                    submenu: [
                                        {
                                            title: 'Menu 1-1-1-1-1',
                                            submenu: []
                                        }
                                    ]
                                },
                                {
                                    title: 'Menu 1-1-1-2',
                                    submenu: []
                                },
                                {
                                    title: 'Menu 1-1-1-3',
                                    submenu: []
                                }
                            ]
                        },
                        {
                            title: 'Menu 1-1-2',
                            submenu: []
                        },
                        {
                            title: 'Menu 1-1-3',
                            submenu: [
                                {
                                    title: 'Menu 1-1-3-1',
                                    submenu: []
                                },
                                {
                                    title: 'Menu 1-1-3-2',
                                    submenu: []
                                },
                                {
                                    title: 'Menu 1-1-3-3',
                                    submenu: []
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Menu 1-2',
                    submenu: [
                        {
                            title: 'Menu 1-2-1',
                            submenu: []
                        },
                        {
                            title: 'Menu 1-2-2',
                            submenu: []
                        },
                        {
                            title: 'Menu 1-2-3',
                            submenu: []
                        }
                    ]
                },
                {
                    title: 'Menu 1-3',
                    submenu: []
                }
            ]
        },
        {
            title: 'Menu 2',
            submenu: []
        },
        {
            title: 'Menu 3',
            submenu: [
                {
                    title: 'Menu 3-1',
                    submenu: [
                        {
                            title: 'Menu 3-1-1',
                            submenu: []
                        },
                        {
                            title: 'Menu 3-1-2',
                            submenu: []
                        },
                        {
                            title: 'Menu 3-1-3',
                            submenu: []
                        }
                    ]
                }
            ]
        }
    ]
}
</script>

<template>
    <div class="page">
        <ExpandableMenu :menuTree="menuTree" :force-close="false" />
    </div>
</template>