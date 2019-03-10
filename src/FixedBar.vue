<template>
    <fixed-header :fixed.sync="isFixed" :threshold="100">
        <transition name="fade">
        <div v-show="isFixed" :class="{ 'is-fixed': isFixed }">
                <div class="top-bar row">
                    <div class="col-md-3 text-sm-center text-xs-center">
                        <img src="/src/assets/logo.png" class="top-bar-logo"/></div>
                    <div :class="(hideNumbers)?'col-md-3 text-center':'col-md-6 text-center'">
                        <div class="menu-phase"><span v-scroll-to="'#phase3'" :class="{actives: phase=='III'}">Fase III</span>-<span v-scroll-to="'#phase2'" :class="{actives: phase=='II'}">Fase II</span>-<span v-scroll-to="'#phase1'" :class="{actives: phase=='I'}">Fase I</span></div>
                    </div>
                    <div class="col-md-3 text-center" v-show="hideNumbers">
                            <a href="#question1" v-scroll-to="'#question1'" :class="{active: isActive(1)}" class="icon-title">1</a>
                            <a href="#question2" v-scroll-to="'#question2'" :class="{active: isActive(2)}" class="icon-title">2</a>
                            <a href="#question3" v-scroll-to="'#question3'" :class="{active: isActive(3)}" class="icon-title">3</a>
                            <a href="#question4" v-scroll-to="'#question4'" :class="{active: isActive(4)}" class="icon-title">4</a>
                    </div>
                    <div class="col-md-3 text-sm-center text-xs-center">
                        <navbar></navbar>
                    </div>
                </div>
        </div>
        </transition>

    </fixed-header>
</template>

<script>
    import FixedHeader from 'vue-fixed-header'
    import Navbar from "./Navbar";

    export default {
        props: ["sect1", "sect2","sect3", "sect4", "whoactive", "phase"],
        components: {
            Navbar,
            FixedHeader
        },
        data() {
            return {
                isFixed: false,
            }
        },
        computed:{
          hideNumbers: function () {
              if(this.phase == "" || this.phase == 'II' || this.phase == 'III'){
                  return false;
              }
              return true;
          }
        },
        methods:{
            isActive: function(item){
                if(item==1){
                    if(this.sect1 < 0 && this.sect2>0){
                        this.$emit('update:whoactive', 1)
                        return true
                    } else {
                        return false
                    }
                }
                if(item==2){
                    if(this.sect2 < 0 && this.sect3>0){
                        this.$emit('update:whoactive', 2)
                        return true
                    } else {
                        return false
                    }
                }
                if(item==3){
                    if(this.sect3 < 0 && this.sect4>0){
                        this.$emit('update:whoactive', 3)
                        return true
                    } else {
                        return false
                    }
                }
                if(item==4){
                    if(this.sect4 < 0){
                        this.$emit('update:whoactive', 4)
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .actives{
        color:red !important;
        /*text-shadow: 0 0 10px #6d6d6d;*/
    }
    .active{
        background-color: #3d6277 !important;
    }
    .fade-enter-active{
        transition: opacity .5s;
    }
    .fade-leave-active {
        transition: opacity 0s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    a:hover{
        text-decoration: none;
    }
    .menu-phase{
        cursor: pointer;
        font-family: Times New Roman, serif;
        font-weight: bold;
        color: #4c768c;;
        margin: 0px auto;
        padding-top: 5px;
        text-align: center;
        font-size: 17px;
        letter-spacing: 3px;
    }

    @media (max-width: 468px) {
        .is-fixed{
            top: auto !important;
            bottom: 0px !important;
        }
        .top-bar-logo {
            margin-left: 0px !important;

        }

    }

    .is-fixed {
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 100000000;
    }

    .top-bar {
        background-color: rgba(255, 255, 255, 0.99);
        padding-top: 10px;
        padding-bottom: 10px;
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.2));
    }

    .top-bar-logo {
        height: 20px;
        margin-left: 20px;
        margin-top: 5px;
    }

    .icon-title {
        cursor: pointer;
        margin: 5px 5px;
        padding-top: 5px;
        border-radius: 50%;
        -moz-border-radius: 0.8em;
        -webkit-border-radius: 0.8em;
        display: inline-block;
        line-height: 20px;
        text-align: center;
        width: 25px;
        letter-spacing: 0px;
        font-size: 18px;
        background-color: red;
        /*border: 2px solid #666;*/
        color: white !important;
        font-family: TradeGothicLTStd-Bold;
    }

    .icon-title:hover {
        background-color: #3d6277;
        filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
        transition: 0.5s;

    }


</style>