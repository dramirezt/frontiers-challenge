<script lang="ts">
import Vue from 'vue'
import PaperPanel from '@/components/exercise-1/PaperPanel.vue'
import AnimatedDocument from '@/components/exercise-1/AnimatedDocument.vue'

export default Vue.extend({
    components: {
        AnimatedDocument,
        PaperPanel
    },
    data() {
        return {
            paper: undefined,
            dataURL: '/frontiers-metropolis-challenge-L1.json',
        }
    },
    methods: {
        fetchData(): void {
            fetch(this.dataURL)
                .then(res => res.json())
                .then(json => {
                    this.paper = json
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
        <AnimatedDocument />
        <div class="text--align-center text--size-title text--weight-bold">
            Thank you for considering participating to this paper
        </div>
        <PaperPanel :paper="paper" v-if="paper" />
    </div>
</template>