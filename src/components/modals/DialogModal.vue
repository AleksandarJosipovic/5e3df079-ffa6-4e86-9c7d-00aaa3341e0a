<template>
  <modal-base
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
  >
    <div class="px-6 py-4">
      <div class="text-lg">
        <slot name="title"> </slot>
      </div>

      <div class="mt-4">
        <slot name="content"> </slot>
      </div>
    </div>

    <div class="px-6 py-4 bg-slate-700/10 text-right relative rounded-b-sm">
      <slot name="footer"> </slot>
    </div>
  </modal-base>
</template>

<script lang="ts">
import ModalBase from "./ModalBase.vue";

export default {
  emits: ["close"],

  components: {
    ModalBase,
  },

  props: {
    show: {
      default: false,
    },
    maxWidth: {
      default: "2xl",
    },
    closeable: {
      default: true,
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
