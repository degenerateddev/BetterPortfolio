<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { gsap } from 'gsap';

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
        console.log(index)
        selectedSection.value = index;
    }

    const scrollToSection = (section: string) => {
        const target = document.getElementById(section);
        console.log(target)
        gsap.to(window, { scrollTo: target, duration: 1, ease: "expo.inOut" });
    }

    onMounted(() => {
        gsap.registerPlugin(ScrollToPlugin);
        gsap.registerPlugin(ScrollSmoother);
        ScrollSmoother.create({
            smooth: 1,
            effects: true
        })
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
                    'hover:text-4xl hover:ibm-semibold min-w-[1/4] text-2xl bg-transparent border-t border-b border-black px-3 py-1 transition-all duration-200',
                    selectedSection.value === index ? 'text-9xl ibm-semibold' : ''
                ]"
                @click.prevent="() => { selectSection(index); scrollToSection(section); }"
            >
                {{ section }}
            </a>
        </div>
    </div>
</template>