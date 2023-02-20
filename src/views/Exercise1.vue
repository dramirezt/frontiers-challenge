<script lang="ts">
import Vue from 'vue'
import PaperPanel from '@/components/exercise-1/PaperPanel.vue'
import AnimatedDocument from '@/components/exercise-1/AnimatedDocument.vue'
import type Paper from '@/types/Paper'

export default Vue.extend({
    components: {
        AnimatedDocument,
        PaperPanel
    },
    data() {
        return {
            paper: <Paper | undefined>(undefined),
            dataURL: <string>('/frontiers-metropolis-challenge-L1.json'),
        }
    },
    methods: {
        fetchData(): void {
            fetch(this.dataURL)
                .then(res => res.json())
                .then(paperData => {
                    this.paper = paperData
                })
                .catch(error => {
                    console.error('Error reading json file: ', error)
                })
        }
    },
    created() {
        this.fetchData()
    }
})
</script>

<template>
    <div class="page">
        <!-- Added 600ms as extra animation delay to take into account view transition-->
        <AnimatedDocument :extraAnimationDelay="600"/>
        <div class="text--align-center text--size-title text--weight-bold">
            Thank you for considering participating to this paper
        </div>
        <PaperPanel :paper="paper" v-if="paper" />
    </div>
</template>