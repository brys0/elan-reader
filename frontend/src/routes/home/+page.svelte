<script lang="ts">
    import { FingerprintVerify, FingerprintEnroll } from "$lib/components/fingerprint"
    import { type IconComponentProps } from "phosphor-svelte"
    import { Scanner, type ElanScanner } from "$lib/Scanner"
    import { StatusResolver } from "$lib/StatusResolver"
    import { Button } from "$lib/components/ui/button"
    import { settingsModal } from "$lib/Stores"
    import { fly } from "svelte/transition"
    import { onMount, type Component } from "svelte"
    import { cn, wait } from "$lib/utils"
    import { Verify, Total, Info, InfoAll, Enroll } from "$bindings"

    import CircleNotch from "phosphor-svelte/lib/CircleNotch"
    import GearSix from "phosphor-svelte/lib/GearSix"
    import Check from "phosphor-svelte/lib/Check"
    import Scan from "phosphor-svelte/lib/Scan"
    import X from "phosphor-svelte/lib/X"
    
    let scanner: null | ElanScanner = $state(null)

    let scanning: boolean = $state(false)
    let completed: boolean = $state(true)
    // let print: State = $state(states.ready)
    let print: null = $state(null)
    let error: string | null = $state(null)
    let verifyState: any = $state(null)
    let hasFingerprintEnrolled: boolean = $state(false)
    let loading: boolean = $state(true)

    async function enroll() {}
    // async function scan() {
    //     error = null
    //     scanning = true
    //     completed = false
    //     print = states.scanning
    //     try {
    //         verifyState = await Verify()
    //         print = states.success
    //         scanning = false
    //         await wait(2000)
    //         completed = true
    //         print = states.ready
    //     } catch (e: any) {
    //         console.log(e)
    //         completed = true
    //         scanning = false
    //         error = e
    //         return print = states.error
    //     }
        
    // }

    // POC flow for scan
    // async function scanOld() {
    //     let randomDuration = ~~(Math.random() * 6000) + 1000
        // error = null
        // scanning = true
        // completed = false
        // print = states.scanning
    //     await wait(randomDuration)
    //     scanning = false
    //     // 50/50 chance to fail for testing purposes
    //     if (Math.random() < 0.5) {
    //         let status = Object.values(StatusResolver.STATUS_CODES)
            // completed = true
            // error = status[~~(Math.random() * status.length)]
            // return print = states.error
    //     } else {
            // print = states.success
            // await wait(2000)
            // completed = true
            // print = states.ready
    //     }
    // }

    onMount(async () => {
        // let total = await Total() ?? 0
        // hasFingerprintEnrolled = total > 0
        hasFingerprintEnrolled = false
        loading = false
        // let test = await Verify()
        // console.log(test)
    })

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
        {#if hasFingerprintEnrolled}
            <FingerprintVerify bind:print bind:scanning bind:completed onScan={() => {}} bind:disabled={loading}/>
        {:else}
            <FingerprintEnroll bind:disabled={loading} />
        {/if}
        <!-- {#if error}
            <div transition:fly={{ y: -20 }} class="py-1.5 px-2 text-center select-none rounded-xl drop-shadow-lg w-full text-sm font-mono text-red-500">
                {error}
            </div>
        {/if} -->
    </div>
    {#if hasFingerprintEnrolled}
        <Button class="w-full">Add new fingerprint</Button>
    {/if}
</div>