<template>
  <ProductContainer class="pt-10 pb-4 px-10" bg="bg-zinc-500 bg-monsters" v-if="gear">
    <div class="flex flex-col items-center space-y-4">
      <div>
        <img :src="gear.image.url" />
      </div>
      <div>
        <SquidTape class="font-splatoon2 text-2xl bg-splatoon-salmonRun -rotate-2" squidSize="16px">
          <div class="px-2">
            {{ $t(`splatnet.gear.${gear.__splatoon3ink_id}.name`, gear.name) }}
          </div>
        </SquidTape>
      </div>
    </div>
  </ProductContainer>
</template>

<script setup>
import ProductContainer from '@/components/ProductContainer.vue';
import SquidTape from '@/components/SquidTape.vue';
import { useCoopGearStore } from '@/stores/gear.mjs';
import { computed } from 'vue';

const gear = computed(() => useCoopGearStore().monthlyGear);
</script>

<style scoped>
:deep(.bg-monsters) {
  background-image: url('@/assets/img/monsters-transparent-bg.png'),
    linear-gradient(180deg, rgba(2, 0, 36, 0.10) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.2) 100%);
  background-size: 400px;
  background-position: top center;
}
</style>
