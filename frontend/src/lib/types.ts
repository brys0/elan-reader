import type { IconComponentProps } from "phosphor-svelte"
import type { Component } from "svelte"

export type State = {
    message: string
    icon: Component<IconComponentProps, {}, "">
    loader?: boolean
}
export type States = Record<
    "readyToScan" | "readyToEnroll" | "scanning" | "success" | "successfulEnroll" | "error" | "enrolling",
    State
>