<template>
   <label class="switch">
      <input :class="checkboxClass" :disabled="disabled" type="checkbox" v-model="checked" />
      <span :class="`switch__slider switch__slider--round ${sliderClass} ${disabled ? 'switch__slider--disabled' : ''}`"></span>
   </label>
</template>

<script>
export default {
   name: "SwitchCheckbox",
   props: {
      disabled: {
         type: Boolean,
         default: false
      },
      value: {
         type: Boolean,
         default: false
      },
      checkboxClass: {
         type: String,
         default: ""
      },
      sliderClass: {
         type: String,
         default: ""
      }
   },
   data: () => ({
      //checked: true
   }),
   computed: {
      checked: {
         get() {
            return this.value;
         },
         set(val) {
            this.$emit("input", val);
         }
      }
   }
};
</script>

<style lang="scss" scoped>
.switch {
   position: relative;
   display: inline-block;
   width: 5rem;
   height: 2rem;
   margin-bottom: 0;

   input {
      opacity: 0;
      width: 0;
      height: 0;
   }

   &__slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;

      &::before {
         position: absolute;
         content: "";
         height: 3rem;
         width: 3rem;
         left: 0rem;
         bottom: -0.4rem;
         background-color: #28a745;
         -webkit-transition: 0.4s;
         transition: 0.4s;
      }

      &--disabled {
         &::before {
            background-color: #28a745;
         }
      }

      input:checked + & {
         background-color: #d32d25;
         &--disabled {
            background-color: #ccc;
         }
      }

      input:focus + & {
         box-shadow: 0 0 0.1rem #d32d25;
      }

      input:checked + &::before {
         -webkit-transform: translateX(2.6rem);
         -ms-transform: translateX(2.6rem);
         transform: translateX(2.6rem);
      }

      &--round {
         border-radius: 3.4rem;
         &::before {
            border-radius: 50%;
         }
      }
   }
}
</style>
