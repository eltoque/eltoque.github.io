<template>
    <v-app>
        <v-autocomplete
                v-model="selected"
                :items="items"
                item-text="label"
                item-value="key"
                append-icon=""
                deletable-chips
                chips
                label="Seleccione "
                multiple >

        </v-autocomplete>
    </v-app>
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