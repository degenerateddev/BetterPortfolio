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

const sections = [
    { label: "GAMES", id: "games" },
    { label: "SIDE QUESTS", id: "side-quests" },
    { label: "ABOUT", id: "about" },
    { label: "CONTACT", id: "contact" },
];
const selectedSection = ref<number>(props.selectedSection);
const menuExpanded = ref<boolean>(false);
const lowerSectionRef = ref<HTMLElement | null>(null);

const selectSection = (index: number) => {
    selectedSection.value = index;
};

const scrollToSection = (id: string, index: number) => {
    const target = document.getElementById(id);
    if (!target) {
        // not on the home page: let the browser navigate there
        window.location.href = '/#' + id;
        return;
    }

    gsap.to(window, { scrollTo: { y: target, offsetY: 120 }, duration: 1, ease: "expo.inOut" });
    closeMenu();
    selectSection(index);
};

const expandMenu = () => {
    if (!menuExpanded.value) {
        gsap.to(lowerSectionRef.value, { height: 'auto', duration: 0.25, ease: "steps(5)" });
        menuExpanded.value = true;
    } else {
        closeMenu();
    }
};

const closeMenu = () => {
    gsap.to(lowerSectionRef.value, { height: 0, duration: 0.15, ease: "steps(3)" });
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
    <div class="p-5 block z-50 fixed top-5 left-[50%] -translate-x-[50%] w-full">
        <div class="w-full hud-bar px-5 py-2">
            <div class="flex justify-between items-center h-16 gap-4">
                <a href="/" class="flex items-center gap-3">
                    <span class="hud text-xs px-2 py-0.5 bg-[var(--accent)] text-[var(--ink)]">P1</span>
                    <span class="text-xl md:text-2xl font-medium">TIM ARNOLD</span>
                </a>
                <div class="flex items-center gap-6">
                    <span class="hidden md:inline hud text-xs">
                        <span class="text-[var(--accent-2)] blink">●</span> NOW DEVELOPING
                    </span>
                    <button
                        type="button"
                        @click="expandMenu()"
                        class="hud text-sm border-2 border-current px-3 py-1 hover:bg-[var(--accent)] hover:text-[var(--ink)] hover:border-[var(--accent)]"
                        :aria-expanded="menuExpanded"
                        aria-controls="pause-menu"
                    >
                        {{ menuExpanded ? 'RESUME' : 'MENU' }}
                    </button>
                </div>
            </div>
            <div
                id="pause-menu"
                ref="lowerSectionRef"
                class="h-0 overflow-hidden"
            >
                <div class="flex flex-col gap-3 md:gap-6 py-10 items-center">
                    <p class="hud text-sm text-[var(--accent)]">— PAUSED —</p>
                    <a
                        v-for="(section, index) in sections"
                        :key="section.id"
                        :class="[
                            'menu-item text-2xl md:text-4xl ibm-base px-3 py-1',
                            selectedSection === index ? 'menu-item--active' : ''
                        ]"
                        :href="'/#' + section.id"
                        @click.prevent="scrollToSection(section.id, index)"
                        @mouseenter="selectSection(index)"
                    >
                        {{ section.label }}
                    </a>
                    <a
                        href="/projects"
                        :class="[
                            'menu-item text-2xl md:text-4xl ibm-base px-3 py-1',
                            selectedSection === sections.length ? 'menu-item--active' : ''
                        ]"
                        @mouseenter="selectSection(sections.length)"
                    >
                        ALL PROJECTS
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .hud-bar {
        background: rgba(13, 13, 13, 0.92);
        color: var(--paper);
        border: 2px solid var(--ink);
        box-shadow: 6px 6px 0 var(--accent);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .menu-item {
        text-decoration: none;
    }

    .menu-item::before {
        content: '> ';
        visibility: hidden;
        color: var(--accent);
    }

    .menu-item--active {
        color: var(--accent);
    }

    .menu-item--active::before {
        visibility: visible;
    }
</style>
