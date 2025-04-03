import { writable } from "svelte/store"

function createModalStore(initialValue: boolean) {

    let store = writable(initialValue)
    
    const toggle = () => store.update(value => !value)
    const open   = () => store.set(true)
    const close  = () => store.set(false)

    return {
        subscribe: store.subscribe,
        set: store.set,
        update: store.update,
        toggle,
        open,
        close
    }

}

export const settingsModal = createModalStore(false)
export const switcherModal = createModalStore(false)