<template>
    <v-fab-transition>
    <v-btn v-show="active>0"
            :color="color"
            v-model="fab"
            dark
            fab
            fixed
            bottom
            right
            @click="gotoNearComment()"
    >
        <font-awesome-icon icon="comment"  size="2x"></font-awesome-icon>
    </v-btn>
    </v-fab-transition>

</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faComment } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faComment)
    export default {
        props: ["active"],
        components:{
            FontAwesomeIcon
        },
        data: () => ({
            near: 1,
            fab: false,
            color: "red",
        }),
        methods: {
            gotoNearComment: function () {
                this.$scrollTo(`#commentbox${this.active}`)
            }
        }
    }
</script>

<style scoped>
    /* This is for documentation purposes and will not be needed in your application */
    #lateral .v-speed-dial,
    #lateral .v-btn--floating {
        position: absolute;
    }
    #lateral .v-btn--floating {
        margin: 0 0 16px 16px;
    }
</style>