<template>
    <div class='demopadding'>
        <div class='icon social fb'><i class='fab fa-facebook-f'></i></div>
        <div class='icon social yt'><i class='fab fa-youtube'></i></div>
        <div class='icon social tw'><i class='fab fa-twitter'></i></div>
        <div class='icon social in'><i class='fab fa-linkedin-in'></i></div>
    </div>
</template>

<script>
    import { dom } from '@fortawesome/fontawesome-svg-core'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faFacebookF, faTwitter, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
    // import { faCoffee } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    library.add(faFacebookF, faTwitter, faYoutube, faLinkedinIn )
    dom.watch()

    export default {
        components:{
            FontAwesomeIcon
        },
        name: "Navbar"
    }
</script>

<style scoped>


    .demopadding {
       float: right;
        padding-right: 20px;
    }

    .icon {
        position:relative;
        text-align:center;
        width:0px;
        height:0px;
        padding: 15px;
        border-top-right-radius: 	 15px;
        border-top-left-radius: 	 15px;
        border-bottom-right-radius:  15px;
        border-bottom-left-radius: 	 15px;
        -moz-border-radius: 		 15px  15px  15px  15px;
        -webkit-border-radius: 		 15px  15px  15px  15px;
        -khtml-border-radius: 		 15px  15px  15px  15px;
        color:#FFFFFF;
    }
    .icon svg {
        font-size: 17px;
        position:absolute;
        left:10px;
        top:7px;
    }
    .icon.social {
        float:left;
        margin:0 5px 0 0;
        cursor:pointer;
        background:#04152e ;
        color:#FFFFFF;
        transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        -o-transition: 0.5s;
    }
    .icon.social:hover {
        background:#FFFFFF ;
        color:#04152e;
        transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        -o-transition: 0.5s;
        -webkit-filter:	drop-shadow(0 1px 10px rgba(0,0,0,.8));
        -moz-filter: 	drop-shadow(0 1px 10px rgba(0,0,0,.8));
        -ms-filter: 		drop-shadow(0 1px 10px rgba(0,0,0,.8));
        -o-filter: 		drop-shadow(0 1px 10px rgba(0,0,0,.8));
        filter: 			drop-shadow(0 1px 10px rgba(0,0,0,.8));
    }

    .icon.social.tw svg {
        left:7px;
    }
    .icon.social.yt svg {
        left:6px;
    }
    .icon.social.in svg {
        left:8px;
    }


</style>