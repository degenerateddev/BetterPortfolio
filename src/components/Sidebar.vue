<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const props = withDefaults(defineProps<{
    selectedSection?: number;
}>(), {
    selectedSection: 0
});

const sections = {
    0: "About",
    1: "Programming",
    2: "Design",
    3: "Cybersecurity",
    4: "Writing"
};
const selectedSection = ref<number>(props.selectedSection);

const selectSection = (index: number) => {
    selectedSection.value = index;
};

const scrollToSection = (section: string, index: number) => {
    const target = document.getElementById(section);
    gsap.to(window, { scrollTo: target, duration: 1, ease: "expo.inOut" });
    
    selectSection(index);
};

onMounted(() => {
    gsap.registerPlugin(ScrollToPlugin);
    selectSection(props.selectedSection);
});

watch(() => props.selectedSection, (newVal) => {
    selectSection(newVal);
});
</script>

<template>
    <div class="space-y-4 fixed left-0 top-[50%] -translate-y-[50%]">
        <div class="flex flex-col items-start gap-10">
            <a
                v-for="(section, index) in sections" 
                :key="index"
                :href="'#' + section"
                :class="[ 
                    'hover:text-4xl min-w-[1/4] text-2xl bg-transparent border-t border-b border-black px-3 py-1 transition-all duration-200',
                    selectedSection === index ? 'text-4xl ibm-semibold' : ''
                ]"
                @click="() => scrollToSection(section, index)"
            >
                {{ section }}
            </a>
        </div>
    </div>
</template>