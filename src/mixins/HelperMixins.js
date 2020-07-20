import { MOBILE_OS } from "@/configs/Settings";
export default {
   name: "Helper Mixins",
   data() {
      return {
         isMobileLayoutSize: false,
      };
   },
   created() {},
   methods: {
      /**
       * Determine the mobile operating system.
       * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
       *
       * @returns {String}
       */
      getMobileOperatingSystem: function() {
         var userAgent = navigator.userAgent || navigator.vendor || window.opera;

         // Windows Phone must come first because its UA also contains "Android"
         if (/windows phone/i.test(userAgent)) {
            return MOBILE_OS.WINDOW_PHONE;
         }

         if (/android/i.test(userAgent)) {
            return MOBILE_OS.ANDROID;
         }

         // iOS detection from: http://stackoverflow.com/a/9039885/177710
         if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return MOBILE_OS.iOS;
         }

         return MOBILE_OS.UN_KNOWN;
      },

       getCurrentMobileOsVersion() {
           var agent = window.navigator.userAgent,
               start = agent.indexOf( 'OS ' );
           if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
               return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
           }
           return 0;
       },

       /**
        *
        */
       onResize() {
           // We execute the same script as before
           let vh = window.innerHeight * 0.01;
           document.documentElement.style.setProperty("--vh", `${vh}px`);
           document.body.scrollTop = 0;
       },
   }
};
