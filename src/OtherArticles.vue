<template>
    <flux-parallax src="/dist/assets/bg_portada.jpg" height="600px" offset="45%" type="fixed">
        <div class="content-related back-dark">
            <h2 class="other-data">Otros contenidos relacionados</h2>
            <h3 class="other-data">Como parte de la cobertura sobre el tema hemos publicado otros textos que
                complementan esta aristas del tema. Aquí los ponemos a tu disposición:</h3>
            <div class="container-fluid">
                <div class="row">
                    <div class="col text-center">
                        <div class="box-other"></div>
                    </div>
                </div>
            </div>
        </div>

    </flux-parallax>
</template>

<script>
    import {FluxParallax} from 'vue-flux';

    export default {
        props:["tag"],
        components: {
            FluxParallax
        },
        name: "OtherArticles"
    }
</script>

<style scoped>
    .back-dark {
        height: 600px;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 0;

    }

    .content-related {
        padding-top: 100px;
    }


    .box-other{
        width: 450px;
        height: 280px;
        background-color: white;
        margin: 10px auto;
    }


    h2.other-data {
        font-family: TradeGothicLTStd-Bold;
        font-size: 33px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 3.3px;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
    }

    h3.other-data {
        font-family: TradeGothicLTStd-Bold;
        font-size: 22px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        max-width: 600px;
        margin: 10px auto;
        text-align: center;
        color: #ffffff;
    }
</style>