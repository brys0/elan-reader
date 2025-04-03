<script lang="ts">
    import { Fingerprint } from "$lib/components/fingerprint"
    import { type IconComponentProps } from "phosphor-svelte"
    import { Scanner, type ElanScanner } from "$lib/Scanner"
    import { StatusResolver } from "$lib/StatusResolver"
    import { Button } from "$lib/components/ui/button"
    import { settingsModal } from "$lib/Stores"
    import { fly } from "svelte/transition"
    import type { Component } from "svelte"
    import { cn, wait } from "$lib/utils"

    import CircleNotch from "phosphor-svelte/lib/CircleNotch"
    import GearSix from "phosphor-svelte/lib/GearSix"
    import Check from "phosphor-svelte/lib/Check"
    import Scan from "phosphor-svelte/lib/Scan"
    import X from "phosphor-svelte/lib/X"
    
    let hardwareAccel = $state(true);
    let selected = $state({
        scanner: "elan-arm-m4",
        print: "xum0unx4"
    })
    let scanner: null | ElanScanner = $state(null)

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

    // POC flow for scan using events
    async function scan() {
        if (!scanner) scanner = new Scanner()
        scanner.on("start", () => {
            error = null
            scanning = true
            completed = false
            print = states.scanning
        })
        scanner.on("complete", async () => {
            print = states.success
            scanning = false
            await wait(2000)
            completed = true
            print = states.ready
        })
        scanner.on("error", (e) => {
            completed = true
            scanning = false
            error = e
            return print = states.error
        })
        await scanner.scan()
    }

    // POC flow for scan
    // async function scanOld() {
    //     let randomDuration = ~~(Math.random() * 6000) + 1000
    //     error = null
    //     scanning = true
    //     completed = false
    //     print = states.scanning
    //     await wait(randomDuration)
    //     scanning = false
    //     // 50/50 chance to fail for testing purposes
    //     if (Math.random() < 0.5) {
    //         let status = Object.values(StatusResolver.STATUS_CODES)
    //         completed = true
    //         error = status[~~(Math.random() * status.length)]
    //         return print = states.error
    //     } else {
    //         print = states.success
    //         await wait(2000)
    //         completed = true
    //         print = states.ready
    //     }
    // }

    $effect(() => {

        return () => {
            scanner = null
        }
    })

</script>

<div class="flex flex-col gap-10 items-center p-8 w-full h-full justify-between">
    <Button onclick={settingsModal.open} size="icon" variant="outline" class="absolute top-4 right-4 max-w-9 max-h-9 z-[9999]">
        <GearSix weight="fill" class="!size-6 fill-muted-foreground" />
    </Button>
    <div class="flex flex-col gap-8 my-10 items-center select-none">
        <div class={cn("flex items-center gap-2 animate-none drop-shadow-lg select-none", scanning && "animate-pulse")}>
            <print.icon size={18} weight="bold" class={cn(print.loader && "animate-spin")} />
            <p>
                {print.message}
            </p>
        </div>
        <Fingerprint bind:scanning bind:completed onScan={scan}/>
        {#if error}
            <div transition:fly={{ y: -20 }} class="py-1.5 px-2 text-center select-none rounded-xl drop-shadow-lg w-full text-sm font-mono text-red-500">
                {error}
            </div>
        {/if}
    </div>

    <Button class="w-full">Add new fingerprint</Button>
</div>