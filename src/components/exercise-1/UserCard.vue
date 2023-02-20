<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconOpen from '@/components/exercise-1/icons/IconOpen.vue'
import type User from '@/types/User'

export default Vue.extend({
    components: {
        IconOpen
    },
    props: {
        user: Object as PropType<User>
    },
    data() {
        return {
            imageError: <boolean>(false)
        }
    },
    computed: {
        initials(): String {
            const name: Array<String> = this.user.fullName.split(' ')

            return name[0].substring(0, 1) + name[1].substring(0, 1)
        }
    },
    watch: {
        user(): void {
            this.imageError = false
        }
    }
})
</script>

<template>
    <div class="card background--white" @click="$emit('click', $event)">
        <div class="card__header">
            <div>
                <div class="card__title text--size-large text--weight-bold">{{ user.fullName }}</div>
                <div class="card__subtitle text--weight-light text--color-gray" v-for="(aff, index) in user.affiliations"
                    :key="'aff-' + index">
                    {{ aff.name }}, {{ aff.city }}, {{ aff.country }}
                </div>
            </div>
            <img class="card__image" :src="user.pictureUrl" @error="imageError = true" v-if="!imageError" />
            <div class="card__image card__image--error border--primary text--size-large text--weight-medium text--color-primary"
                v-else>
                {{ initials }}
            </div>
        </div>
        <div class="card__body text--weight-light">
            <div>
                <span class="text--weight-bold text--color-primary">{{ user.publications }}</span> Publications
            </div>
            <div>
                <span class="text--weight-bold text--color-primary">{{ user.views }}</span> Views
            </div>
            <div>
                <span class="text--weight-bold text--color-primary">{{ user.followers }}</span> Followers
            </div>
        </div>
        <div class="card__footer">
            <a class="link text--color-primary" :href="user.profileUrl" target="_blank" rel="nofollow">
                <IconOpen class="icon" />
                View profile
            </a>
        </div>
    </div>
</template>