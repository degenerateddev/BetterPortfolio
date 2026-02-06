<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    keyWords: Record<string, number>;
}>();

const keyWords = ref(Object.entries(props.keyWords));

const getClassForValue = (value: number) => {
    if (value >= 1 && value <= 2) return 'text-sm';
    if (value >= 3 && value <= 4) return 'text-base';
    if (value >= 5 && value <= 6) return 'text-xl';
    if (value >= 7) return 'text-2xl';
    return 'text-sm';
};

const selectedKeyWords = ref<string[]>([]);
const selectKeyWord = (keyWord: string) => {
    if (selectedKeyWords.value.includes(keyWord)) {
        selectedKeyWords.value = selectedKeyWords.value.filter(kw => kw !== keyWord);
    } else {
        selectedKeyWords.value.push(keyWord);
    }
    console.log(selectedKeyWords.value);
};
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
            <button
                v-for="([keyWord, value], index) in keyWords" 
                :key="index" 
                :class="[
                    getClassForValue(value),
                    'cursor-pointer bg-gray-100 px-3 py-1 rounded transition-all duration-200',
                    selectedKeyWords.includes(keyWord) ? 'bg-black text-white' : ''
                ]"
                @click="() => selectKeyWord(keyWord)"
            >
                {{ keyWord }}
            </button>
        </div>
    </div>
</template>