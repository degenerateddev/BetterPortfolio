<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const props = withDefaults(defineProps<{
    selectedSection?: number;
    currentURL?: string;
}>(), {
    selectedSection: 0,
    currentURL: ''
});

const sections = {
    0: "About",
    1: "Programming",
    2: "Design",
    4: "Writing"
};
const selectedSection = ref<number>(props.selectedSection);
const currentURL = ref<string>(props.currentURL);

const selectSection = (index: number) => {
    selectedSection.value = index;
};

const scrollToSection = async (section: string, index: number) => {
    if (currentURL.value !== '/') {
        window.location.href = '/#' + section;
    }

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
    <div class="hidden md:block space-y-4 fixed top-5 left-[50%] w-[90vw] -translate-x-[50%] border border-black glassmorphism p-5">
        <div class="flex flex-col md:flex-row gap-1 md:gap-10 ibm-base text-center items-center justify-center">
            <div
                v-for="(section, index) in sections" 
                :key="index"
                :class="[ 
                    'hover:translate-y-1 hover:scale-125 ease-in-out transition-all duration-200 bg-transparent min-w-[1/4] text-2xl px-3 py-1',
                    selectedSection === index ? 'translate-y-1 scale-125' : ''
                ]"
            >
                <a 
                    :class="[ 
                        'bg-transparent',
                        selectedSection === index ? 'scale-125 ibm-semibold' : ''
                    ]"
                    :href="'/#' + section"
                    @click.prevent="scrollToSection(section, index)"
                >
                    {{ section }}
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .glassmorphism {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
</style>