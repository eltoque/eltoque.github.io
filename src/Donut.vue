<template>

    <div class="container">
        <div class="row">
            <div class="col-sm">
                <v-progress-circular
                        :rotate="65"
                        :size="size"
                        :width="width"
                        :value="value1"
                        color="#fb912d"
                >
                    <h1>{{ value1 }}%</h1>
                </v-progress-circular>
            </div>
            <div class="col-sm">
                <v-progress-circular
                        :rotate="65"
                        :size="size"
                        :width="width"
                        :value="value2"
                        color="#fb912d"
                >
                    <h1>{{ value2 }}%</h1>

                </v-progress-circular>
            </div>
            <div class="col-sm">
                <v-progress-circular
                        :rotate="65"
                        :size="size"
                        :width="width"
                        :value="value3"
                        color="#fb912d"
                >
                    <h1>{{ value3 }}%</h1>

                </v-progress-circular>
            </div>
            <div class="col-sm">
                <v-progress-circular
                        :rotate="65"
                        :size="size"
                        :width="width"
                        :value="value4"
                        color="#fb912d"
                >
                    <h1>{{ value4 }}%</h1>

                </v-progress-circular>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: 51.5,
                value2: 37.6,
                value3: 10.8,
                value4: 30.8,
                size: 200,
                width: 40
            };

        },
    };
</script>

<style lang="stylus">
    .v-progress-circular {
        margin: 1rem;
    }

    .v-progress-circular__underlay {
        stroke: rgb(51, 204, 178, 255);
    }
</style>