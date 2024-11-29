<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    selectedSection: number;
}>();

const sections = {
    0: "About",
    1: "Programming",
    2: "Design",
    3: "Cybersecurity",
    4: "Writing"
}
const selectedSection = ref<number>(props.selectedSection);

const selectSection = (index: number) => {
    selectedSection.value = index;
}
</script>

<template>
    <div class="space-y-4 fixed left-0 top-[50%] -translate-y-[50%]">
        <div class="flex flex-col items-start gap-10">
            <a
                v-for="(section, index) in sections" 
                :key="index" 
                :href="'#' + section.toLowerCase()" 
                :class="[
                    'hover:text-4xl hover:ibm-semibold min-w-[1/4] text-2xl bg-transparent border-t border-b border-black px-3 py-1 transition-all duration-200',
                    selectedSection === index ? 'text-4xl ibm-semibold' : ''
                ]"
                @click="() => selectSection(index)"
            >
                {{ section }}
            </a>
        </div>
    </div>
</template>