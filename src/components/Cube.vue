<script setup lang="ts">
    import { TresCanvas } from '@tresjs/core';
    import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three';

    const gl = {
        clearColor: '#181C3E',
        shadows: true,
        alpha: false,
        shadowMapType: BasicShadowMap,
        outputColorSpace: SRGBColorSpace,
        toneMapping: NoToneMapping
    }

    //https://www.youtube.com/watch?v=0Lg9uAuhpG8
</script>

<template>
    <div class="tres-container">
        <TresCanvas v-bind="gl">
            <TresPerspectiveCamera :position="{ x: 0, y: 0, z: 5 }" />
        </TresCanvas>
    </div>
</template>

<style scoped>
    .tres-container {
        width: 100%;
        height: 400px;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>