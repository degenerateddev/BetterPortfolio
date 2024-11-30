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
    3: "Cybersecurity",
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
    <div class="hidden md:block space-y-4 fixed top-5 left-[50%] -translate-x-[50%]">
        <div class="flex flex-col md:flex-row gap-1 md:gap-10 ibm-base text-center items-center">
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