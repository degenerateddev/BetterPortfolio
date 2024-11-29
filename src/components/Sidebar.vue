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
            <div
                v-for="(section, index) in sections" 
                :key="index"
                :class="[ 
                    'hover:translate-x-14 hover:scale-125 ease-in-out transition-all duration-200 bg-transparent min-w-[1/4] text-2xl px-3 py-1',
                    selectedSection === index ? 'translate-x-10 scale-125 ibm-semibold' : ''
                ]"
            >
                <a 
                    :class="[ 
                        'bg-transparent',
                        selectedSection === index ? 'scale-125 ibm-semibold' : ''
                    ]"
                    :href="'#' + section"
                    @click.prevent="scrollToSection(section, index)"
                >
                    {{ section }}
                </a>
            </div>
        </div>
    </div>
</template>