<template>
    <div>
        <v-autocomplete
                v-model="selected"
                :items="items"
                item-text="label"
                item-value="key"
                persistent-hint
                box
                chips
                color="blue-grey lighten-2"
                label="Select"
                multiple >
            <v-slide-x-reverse-transition
                    slot="append-outer"
                    mode="out-in"    >
            </v-slide-x-reverse-transition>
        </v-autocomplete>
    </div>
</template>

<script>
    import Topics from './assets/topics.json';

    export default {
        name: "Topic",
        data (){
            return {
                selected: null,
                items: Topics,

            }
        }

    }
</script>

<style scoped>

</style>