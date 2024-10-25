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
            <TresPerspectiveCamera :position="[0, 0, 5]" />
            <TresMesh>
                <TresBoxGeometry :args="[3, 3, 3]" />
                <TresMeshStandardMaterial color="#e6e6e6" />
            </TresMesh>
        </TresCanvas>
    </div>
</template>

<style scoped>
    .tres-container {
        width: 100%;
        height: 80vh;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>