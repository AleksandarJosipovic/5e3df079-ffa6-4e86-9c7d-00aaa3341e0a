<template>
  <Teleport to="body">
    <transition leave-active-class="duration-200">
      <div
        v-show="show"
        class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-5 z-50"
        scroll-region
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="show"
            class="fixed inset-0 transform transition-all"
            @click="close"
          >
            <div class="absolute inset-0 bg-slate-900 opacity-75"></div>
          </div>
        </transition>

        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="show"
            class="mb-6 rounded-sm shadow-xl transform transition-all sm:w-full sm:mx-auto relative"
            :class="[maxWidthClass, backgroundClass]"
          >
            <div
              @click="close"
              class="absolute -top-2 -right-2 fill-regal-yellow w-8 h-8 rounded-full bg-regal-500 shadow-md drop-shadow-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="w-8 fill-red-600"
              >
                <path
                  d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                />
              </svg>
            </div>
            <slot v-if="show"></slot>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { onMounted, onUnmounted } from "vue";

export default {
  emits: ["close"],

  props: {
    show: {
      default: false,
    },
    maxWidth: {
      default: "2xl",
    },
    background: {
      default: "white",
    },
    closeable: {
      default: true,
    },
  },

  setup(props, { emit }) {
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };

    const closeOnEscape = (e: any) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));

    return {
      close,
    };
  },

  computed: {
    maxWidthClass() {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
        "7xl": "sm:max-w-7xl",
      }[this.maxWidth];
    },
    backgroundClass() {
      return {
        white: "bg-white",
        gray: "bg-gray-900",
        regal: "bg-regal-900",
      }[this.background];
    },
  },
};
</script>
