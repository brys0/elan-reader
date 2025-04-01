<script lang="ts">
    import { Fingerprint } from "$lib/components/fingerprint";
    import type { IconComponentProps } from "phosphor-svelte";
    import CircleNotch from "phosphor-svelte/lib/CircleNotch";
    import { Button } from "$lib/components/ui/button";
    import Check from "phosphor-svelte/lib/Check";
    import Scan from "phosphor-svelte/lib/Scan";
    import { fly } from "svelte/transition";
    import type { Component } from "svelte";
    import X from "phosphor-svelte/lib/X";
    import { cn } from "$lib/utils";

    type State = {
        message: string
        icon: Component<IconComponentProps, {}, "">
        loader?: boolean
    }
    type States = Record<"ready" | "scanning" | "success" | "error", State>

    let states: States = {
        ready: { message: "Ready", icon: Scan },
        scanning: { message: "Scanning...", icon: CircleNotch, loader: true },
        success: { message: "Scan Successful", icon: Check },
        error: { message: "Scan Failed", icon: X }
    }
    let scanning: boolean = $state(false)
    let completed: boolean = $state(true)
    let print: State = $state(states.ready)
    let error: string | null = $state(null)

    // POC flow for scan
    function scan() {
        let randomDuration = ~~(Math.random() * 6000) + 1000
        error = null
        scanning = true
        completed = false
        print = states.scanning
        setTimeout(() => {
            scanning = false
            // 50/50 chance to fail for testing purposes
            if (Math.random() < 0.5) {
                let errors = [
                    "Move your finger a little to the left",
                    "Move your finger a little to right",
                    "Finger not detected",
                ]
                completed = true
                error = errors[~~(Math.random() * errors.length)]
                return print = states.error
            } else {
                print = states.success
                setTimeout(() => {
                    completed = true
                    print = states.ready
                }, 2000)
            }
        }, randomDuration)
    }

</script>

<div class="flex flex-col gap-10 items-center justify-between pt-20 p-8 w-full h-full">
    <div class="flex flex-col gap-10 items-center">
        <div class={cn("flex items-center gap-2 animate-none drop-shadow-lg", scanning && "animate-pulse")}>
            <print.icon size={18} weight="bold" class={cn(print.loader && "animate-spin")} />
            <p class="font-spacegrotesk">
                {print.message}
            </p>
        </div>
        <Fingerprint bind:scanning bind:completed onScan={scan}  />
        {#if error}
            <div transition:fly={{ y: -20 }} class="py-1.5 px-2 text-center rounded-xl bg-secondary/40 drop-shadow-lg w-full text-sm font-mono text-red-500">
                {error}
            </div>
        {/if}
    </div>

    <Button class="w-full">Add new fingerprint</Button>
</div>