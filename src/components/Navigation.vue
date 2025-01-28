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
    0: "ABOUT",
    1: "PROGRAMMING",
    2: "DESIGN",
    4: "WRITING"
};
const selectedSection = ref<number>(props.selectedSection);
const currentURL = ref<string>(props.currentURL);
const menuExpanded = ref<boolean>(false);
const lowerSectionRef = ref<HTMLElement | null>(null);

const selectSection = (index: number) => {
    selectedSection.value = index;
};

const scrollToSection = async (section: string, index: number) => {
    if (currentURL.value !== '/') {
        window.location.href = '/#' + section;
    }

    const target = document.getElementById(section);
    if (target) {
        gsap.to(window, { scrollTo: target, duration: 1, ease: "expo.inOut" });
    } else {
        console.error(`Element with ID ${section} not found.`);
    }
    
    closeMenu();
    selectSection(index);
};

const expandMenu = () => {
    if (!menuExpanded.value) {
        gsap.to(lowerSectionRef.value, { height: '85vh', duration: 0.2, ease: "power3.inOut" });
        menuExpanded.value = true;
    } else {
        closeMenu();
    }
};

const closeMenu = () => {
    gsap.to(lowerSectionRef.value, { height: "0", duration: 0.2, ease: "power3.inOut" });
    menuExpanded.value = false;
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
    <div class="block space-y-4 fixed top-5 left-[50%] w-[90vw] -translate-x-[50%] border border-black glassmorphism p-5 h-auto">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-bold">TIM ARNOLD</div>
            <div>
                <a @click.prevent="expandMenu()" class="bg-transparent hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </a>
            </div>
        </div>
        <div ref="lowerSectionRef" class="flex flex-col gap-1 md:gap-10 ibm-base text-center items-center justify-center h-0 overflow-hidden transition-all duration-100">
            <div
                v-for="(section, index) in sections" 
                :key="index"
                :class="[ 
                    'bg-transparent min-w-[1/4] text-2xl px-3 py-1'
                ]"
            >
                <a 
                    :class="[ 
                        'bg-transparent',
                        selectedSection === index ? 'ibm-semibold underline' : ''
                    ]"
                    :href="'/#' + section"
                    @click.prevent="scrollToSection(section.toLowerCase(), index)"
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