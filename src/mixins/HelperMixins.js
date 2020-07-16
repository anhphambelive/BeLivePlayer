import { MOBILE_OS } from "../configs/Settings";
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
   }
};
