<script setup lang="ts">
    const props = defineProps<{
        keyWords: string[];
    }>();

    const keyWords = props.keyWords;
</script>

<template>
    <div class="flex items-center gap-3">
        <div v-for="(keyWord, index) in Object.entries(keyWords)" :key="index">
            <div class="text-base" v-if="keyWord[1] === 1">
                {{ keyWord[0] }}
            </div>
            <div class="text-xl" v-else-if="keyWord[1] === 2">
                {{ keyWord[0] }}
            </div>
            <div class="text-2xl" v-else>
                {{ keyWord[0] }}
            </div>
        </div>
    </div>
</template>