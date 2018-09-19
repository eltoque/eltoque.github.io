<template>
    <social-sharing url="https://constitucion.eltoque.com"
                    title="La Cuba que viene: claves para comprender la reforma constitucional"
                    description=""
                    quote=""
                    hashtags="ReformaConstitucional,política,Cuba,GobiernoCubano"
                    twitter-user="eltoquecom"
                    inline-template>
        <div class='demopadding'>
            <network network="facebook">
                <div class='icon-n social fb'><i class='fab fa-facebook-f'></i></div>
            </network>
            <network network="googleplus">
                <div class='icon-n social gp'><i class='fab fa-google-plus-g'></i></div>
            </network>
            <network network="twitter">
                <div class='icon-n social tw'><i class='fab fa-twitter'></i></div>
            </network>
            <network network="linkedin">
                <div class='icon-n social in'><i class='fab fa-linkedin-in'></i></div>
            </network>
        </div>
    </social-sharing>

</template>

<script>
    import {dom} from '@fortawesome/fontawesome-svg-core'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faFacebookF,
        faTwitter,
        faInstagram,
        faLinkedinIn,
        faGooglePlusG,
        faWhatsapp
    } from '@fortawesome/free-brands-svg-icons';
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


    library.add(faFacebookF, faTwitter, faLinkedinIn, faInstagram, faGooglePlusG, faWhatsapp)
    dom.watch()

    export default {
        components: {
            FontAwesomeIcon,
        },
        name: "Navbar"
    }
</script>

<style>


    .demopadding {
        float: right;
        padding-right: 20px;
        display: inline-list-item;
    }

    .icon-n {
        position: relative;
        text-align: center;
        width: 0px;
        height: 0px;
        padding: 15px;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        -moz-border-radius: 15px 15px 15px 15px;
        -webkit-border-radius: 15px 15px 15px 15px;
        -khtml-border-radius: 15px 15px 15px 15px;
        color: #FFFFFF;
    }

    .icon-n svg {
        font-size: 17px;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .icon-n.social {
        float: left;
        margin: 0 5px 0 0;
        cursor: pointer;
        background: #04152e;
        color: #FFFFFF;
        transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        -o-transition: 0.5s;
    }

    .icon-n.social:hover {
        background: #FFFFFF;
        color: #04152e;
        transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        -o-transition: 0.5s;
        -webkit-filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
        -moz-filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
        -ms-filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
        -o-filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
        filter: drop-shadow(0 1px 10px rgba(0, 0, 0, .8));
    }

    .icon-n.social.tw svg {
        left: 7px;
    }

    .icon-n.social.yt svg {
        left: 6px;
    }

    .icon-n.social.in svg {
        left: 8px;
    }

    .icon-n.social.gp svg {
        left: 6.5px;
        top: 6px;
    }


</style>