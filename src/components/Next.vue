<script setup lang="ts">
    import { ref } from 'vue';

    const props = withDefaults(defineProps<{
        href?: string;
        onClick: any;
    }>(), {
        href: "",
        onClick: null
    });

    const href = ref<string>(props.href);
    const handleClick = () => {
        if (typeof props.onClick === 'function') {
            props.onClick();
        }
    };
</script>

<template>
    <a class="hover:scale-105 duration-100 ease-linear" :href="href" @click="handleClick">
      <div class="flex">
        <svg width="67" height="53" viewBox="0 0 67 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31 1L64 25L31 52" stroke="black" stroke-width="2"/>
          <path d="M17 1L50 25L17 52" stroke="black" stroke-width="1.5"/>
          <path d="M3 1L36 25L3 52" stroke="black"/>
        </svg>            
      </div>
    </a>
</template>