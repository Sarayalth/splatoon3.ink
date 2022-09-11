import { acceptHMRUpdate, defineStore } from "pinia";
import { computed } from "vue";
import { useSchedulesStore } from "./data";
import { useTimeStore } from "./time";


function defineScheduleStore(id, options) {
  return defineStore(`schedules/${id}`, () => {
    const transform = node => ({
      ...node,
      settings: options.settings(node),
    });

    const time = useTimeStore();
    const schedules = computed(() => options.nodes()?.map(n => transform(n)));

    const currentSchedules = computed(() => schedules.value?.filter(s => time.isCurrent(s.endTime)));
    const activeSchedule = computed(() => schedules.value?.find(s => time.isActive(s.startTime, s.endTime)));
    const upcomingSchedules = computed(() => schedules.value?.filter(s => time.isUpcoming(s.startTime)));

    return { schedules, currentSchedules, activeSchedule, upcomingSchedules };
  });
}

// Regular Battle
export const useRegularSchedulesStore = defineScheduleStore('regular', {
  nodes: () => useSchedulesStore().data?.regularSchedules.nodes,
  settings: node => node.regularMatchSetting,
});

// Anarchy Battle
export const useAnarchySeriesSchedulesStore = defineScheduleStore('anarchy/series', {
  nodes: () => useSchedulesStore().data?.bankaraSchedules.nodes,
  settings: node => node.bankaraMatchSettings.find(s => s.mode === 'CHALLENGE'),
});

export const useAnarchyOpenSchedulesStore = defineScheduleStore('anarchy/open', {
  nodes: () => useSchedulesStore().data?.bankaraSchedules.nodes,
  settings: node => node.bankaraMatchSettings.find(s => s.mode === 'OPEN'),
});

// Salmon Run
export const useSalmonRunSchedulesStore = defineScheduleStore('salmonRun', {
  nodes: () => useSchedulesStore().data?.coopGroupingSchedule.regularSchedules.nodes,
  settings: node => node.setting,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRegularSchedulesStore, import.meta.hot));
  import.meta.hot.accept(acceptHMRUpdate(useAnarchySeriesSchedulesStore, import.meta.hot));
  import.meta.hot.accept(acceptHMRUpdate(useAnarchyOpenSchedulesStore, import.meta.hot));
  import.meta.hot.accept(acceptHMRUpdate(useSalmonRunSchedulesStore, import.meta.hot));
}
