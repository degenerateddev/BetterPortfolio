<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    text?: string;
}>();

interface Token {
    type: 'heading' | 'paragraph' | 'ul' | 'ol' | 'blockquote' | 'code-block' | 'hr';
    content: string;
    level?: number;
    items?: string[];
    lang?: string;
}

const tokenize = (raw: string): Token[] => {
    const lines = raw.split('\n');
    const tokens: Token[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Blank line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Horizontal rule
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
            tokens.push({ type: 'hr', content: '' });
            i++;
            continue;
        }

        // Fenced code block
        if (line.trim().startsWith('```')) {
            const lang = line.trim().slice(3).trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            tokens.push({ type: 'code-block', content: codeLines.join('\n'), lang });
            i++;
            continue;
        }

        // Heading
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            tokens.push({ type: 'heading', content: headingMatch[2], level: headingMatch[1].length });
            i++;
            continue;
        }

        // Blockquote
        if (line.trimStart().startsWith('> ')) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].trimStart().startsWith('> ')) {
                quoteLines.push(lines[i].trimStart().slice(2));
                i++;
            }
            tokens.push({ type: 'blockquote', content: quoteLines.join('\n') });
            continue;
        }

        // Unordered list
        if (/^\s*[-*+]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*+]\s+/, ''));
                i++;
            }
            tokens.push({ type: 'ul', content: '', items });
            continue;
        }

        // Ordered list
        if (/^\s*\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
                i++;
            }
            tokens.push({ type: 'ol', content: '', items });
            continue;
        }

        // Paragraph (collect consecutive non-special lines)
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !/^#{1,6}\s/.test(lines[i]) &&
            !/^\s*[-*+]\s+/.test(lines[i]) &&
            !/^\s*\d+\.\s+/.test(lines[i]) &&
            !lines[i].trimStart().startsWith('> ') &&
            !lines[i].trim().startsWith('```') &&
            !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
        ) {
            paraLines.push(lines[i]);
            i++;
        }
        if (paraLines.length > 0) {
            tokens.push({ type: 'paragraph', content: paraLines.join('\n') });
        }
    }

    return tokens;
};

const parseInline = (text: string): string => {
    let result = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline max-w-full rounded" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*{3}(.+?)\*{3}/g, '<strong><em>$1</em></strong>')
        .replace(/_{3}(.+?)_{3}/g, '<strong><em>$1</em></strong>')
        .replace(/\*{2}(.+?)\*{2}/g, '<strong>$1</strong>')
        .replace(/_{2}(.+?)_{2}/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/~~(.+?)~~/g, '<del>$1</del>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        .replace(/\n/g, '<br />');

    return result;
};

const tokens = computed(() => tokenize(props.text));
</script>

<template>
    <div class="markdown-text space-y-4" v-if="$props.text">
        <template v-for="(token, idx) in tokens" :key="idx">
            <h1 v-if="token.type === 'heading' && token.level === 1"
                class="text-4xl font-bold"
                v-html="parseInline(token.content)" />

            <h2 v-else-if="token.type === 'heading' && token.level === 2"
                class="text-3xl font-bold"
                v-html="parseInline(token.content)" />

            <h3 v-else-if="token.type === 'heading' && token.level === 3"
                class="text-2xl font-semibold"
                v-html="parseInline(token.content)" />

            <h4 v-else-if="token.type === 'heading' && token.level === 4"
                class="text-xl font-semibold"
                v-html="parseInline(token.content)" />

            <h5 v-else-if="token.type === 'heading' && token.level === 5"
                class="text-lg font-medium"
                v-html="parseInline(token.content)" />

            <h6 v-else-if="token.type === 'heading' && token.level === 6"
                class="text-base font-medium"
                v-html="parseInline(token.content)" />

            <p v-else-if="token.type === 'paragraph'"
               v-html="parseInline(token.content)" />

            <ul v-else-if="token.type === 'ul'" class="list-disc list-inside space-y-1">
                <li v-for="(item, iIdx) in token.items" :key="iIdx" v-html="parseInline(item)" />
            </ul>

            <ol v-else-if="token.type === 'ol'" class="list-decimal list-inside space-y-1">
                <li v-for="(item, iIdx) in token.items" :key="iIdx" v-html="parseInline(item)" />
            </ol>

            <blockquote v-else-if="token.type === 'blockquote'"
                        class="border-l-4 border-gray-500 pl-4 italic text-gray-400"
                        v-html="parseInline(token.content)" />

            <pre v-else-if="token.type === 'code-block'"
                 class="bg-gray-900 text-gray-200 rounded-lg p-4 overflow-x-auto text-sm font-mono"><code>{{ token.content }}</code></pre>

            <hr v-else-if="token.type === 'hr'" class="border-gray-700" />
        </template>
    </div>
</template>
