import { createBasicStore } from "katai";
import { createStore } from "katai/core";
import { writable } from "svelte/store";
import type { Finger } from "$bindingsdriver";
import { Delete, DeleteAll, InfoAll, Enroll } from "$bindings";
import { Events } from "@wailsio/runtime";

// export const fingerprintS = createStore<{
//   fingers: (Finger | null)[];
// }>("fingers", {
//   fingers: [],
// });
// export const fingerprintStore = createBasicStore("fingerprint", {
//   state: {
//     count: 0,
//     fingers: [] as (Finger | null)[],
//   },
//   getters: {
//     $state: (state) => state,
//     ownsAnyFingerprints: (state) =>
//       state.fingers.find((f) => f != null) != null,
//   },
//   actions: {
//     hi: async function deleteFinger(state, id: number) {
//       console.log(this);
//       console.log(state);
//       await Delete(id);
//       // await state.getInfo()
//     },
//     getInfo: async (state) => (state.fingers = await InfoAll()),
//   },
// });

// export class FingerprintStore {
//   state =

//   constructor() {

//   }
// }
export function useFingerprintStore() {
  const state = $state({
    fingers: [] as (Finger | null)[],
  });

  return {
    get fingers() {
      return state.fingers;
    },

    getInfo: async () => {
      state.fingers = await InfoAll();
      return state.fingers;
    },
    deleteAll: async function () {
      await DeleteAll();
      await this.getInfo();
    },
    deleteFinger: async function (id: number) {
      await Delete(id);
      await this.getInfo();
    },
    // Brad can do this, im too tired tonight
    // enroll: async function (
    //   totalSamples: number,
    //   data: string,
    //   onSample: ({ current, total }: { current: number; total: number }) => any,
    //   onError: (err: string) => any,
    // ) {
    //   $effect(() => {
    //    const error = Events.On('error', (e) => )
    //    return () => {

    //    }
    //   })
    //   const removeOnError = Events.On('error', ())
    //   Enroll();
    // },
    get ownsAnyFingerprints() {
      return state.fingers.find((f) => f != null) != null;
    },
  };
}
function createModalStore(initialValue: boolean) {
  let store = writable(initialValue);

  const toggle = () => store.update((value) => !value);
  const open = () => store.set(true);
  const close = () => store.set(false);

  return {
    subscribe: store.subscribe,
    set: store.set,
    update: store.update,
    toggle,
    open,
    close,
  };
}

export const settingsModal = createModalStore(false);
export const switcherModal = createModalStore(false);
