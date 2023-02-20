<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import CollapsibleList from '@/components/exercise-1/CollapsibleList.vue'
import PaperUser from '@/components/exercise-1/PaperUser.vue'
import UserCard from '@/components/exercise-1/UserCard.vue'
import type Affiliation from '@/types/Affiliation'
import type Paper from '@/types/Paper'
import type User from '@/types/User'

export default Vue.extend({
    components: {
        CollapsibleList,
        PaperUser,
        UserCard
    },
    props: {
        paper: { type: Object as PropType<Paper> }
    },
    data() {
        return {
            selectedUser: <User | undefined>(undefined)
        }
    },
    computed: {
        uniqueAffiliations(): Array<Affiliation> {
            let affiliations: Array<Affiliation> = []

            if (this.paper) {
                let allUsers: Array<User> = [this.paper.yourself, this.paper.editor, ...this.paper.authors]

                // Get all affiliations
                allUsers.forEach((u: User) => {
                    affiliations = affiliations.concat(u.affiliations)
                })

                // Filter unique affiliations
                affiliations = affiliations.filter(
                    (aff, index, arr) => {
                        return arr.findIndex(a => this.compareAffiliations(aff, a)) === index
                    }
                )
            }

            return affiliations
        },
        yourself(): User {
            return this.parseUser(this.paper.yourself)
        },
        editor(): User {
            return this.parseUser(this.paper.editor)
        },
        authors(): Array<User> {
            let authors: Array<User> = []

            this.paper.authors.forEach(a => {
                authors.push(this.parseUser(a))
            })

            return authors
        }
    },
    methods: {
        /**
         * Compares two affiliations to check if they are the same
         */
        compareAffiliations(a: Affiliation, b: Affiliation): boolean {
            return a.id == b.id
        },
        /**
         * Adds index field to user's affiliations using computed affiliations unique list.
         */
        parseUser(user: User): User {
            let u = JSON.parse(JSON.stringify(user))

            u.affiliations.map((aff: Affiliation) => {
                let userAffiliation = this.uniqueAffiliations.filter((a: Affiliation) => {
                    return this.compareAffiliations(aff, a)
                })[0]

                aff.index = this.uniqueAffiliations.indexOf(userAffiliation) + 1
            })

            u.affiliations.sort((a: Affiliation, b: Affiliation) => {
                return a.index && b.index && a.index > b.index ? 1 : -1
            })

            return u
        },
        displayCard(user: User | undefined, event: Event): void {
            if (this.selectedUser !== user && event.target) {
                this.selectedUser = user

                const clickedUserCoords = (<HTMLButtonElement>event.target).getBoundingClientRect()

                /**
                 * Positions user card aligned with the clicked name.
                 * 
                 * This function could be refined to consider viewport width and prevent
                 * body overflow on card display.
                 */
                this.$nextTick(() => {
                    if (this.$refs.card) {
                        const card: any = this.$refs.card
                        card.$el.style.top = clickedUserCoords.y + clickedUserCoords.height + 'px'
                        card.$el.style.left = clickedUserCoords.x + 'px'
                    }
                })
            }
            else {
                this.selectedUser = undefined
            }
        },
        clickEventListener() {
            this.selectedUser = undefined
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickEventListener)
    },
    mounted() {
        document.addEventListener('click', this.clickEventListener)
    }
})
</script>

<template>
    <div class="paper__container background--white">
        <div class="text--color-gray text--size-medium text--weight-light">
            {{ paper.type }}
        </div>
        <h1 class="text--size-xlarge text--weight-bold">
            {{ paper.title }}
        </h1>
        <div>
            <span class="text--weight-bold text--size-medium">Authors</span>
            <PaperUser v-for="(user, index) in authors" :key="'author-' + index" :user="user"
                :isLast="authors.length > 1 && index + 1 == authors.length" @display-user="displayCard(user, $event)" />
        </div>
        <div>
            <span class="text--weight-bold text--size-medium">Editor</span>
            <PaperUser :user="editor" @display-user="displayCard(editor, $event)" />
        </div>
        <div>
            <span class="text--weight-bold text--size-medium">Yourself</span>
            <PaperUser :user="yourself" @display-user="displayCard(yourself, $event)" />
        </div>
        <CollapsibleList :title="'Affiliations'">
            <template v-slot:content>
                <div class="text--color-gray text--weight-light" v-for="(aff, index) in uniqueAffiliations" :key="'aff-' + index">
                    <sup class="text--color-default">{{ index + 1 }}</sup>
                    {{ aff.name }}, {{ aff.city }}, {{ aff.country }}
                </div>
            </template>
        </CollapsibleList>
        <div class="text--size-medium">
            {{ paper.journal }} | {{ paper.section }}
        </div>
        <transition name="fade" tag="div">
            <UserCard ref="card" :user="selectedUser" @click.stop v-if="selectedUser" />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.paper__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 32px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    gap: 8px;
    max-width: 659px;
    width: 100%;
}

span {
    margin-right: 0.2em;
}
</style>