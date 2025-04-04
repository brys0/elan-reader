<script lang="ts">
    import "@aarsteinmedia/dotlottie-player-light"
    
    import type DotLottiePlayer from "@aarsteinmedia/dotlottie-player-light"
    import { cn, shadows, states, wait } from "$lib/utils"
    import { RangeSlider } from "$elan/range-slider"
    import * as Tooltip from "$shadcn/tooltip"
    import { Events } from "@wailsio/runtime"
    import { Input } from "$shadcn/input"
    import { Label } from "$shadcn/label"
    import { type State } from "$types"
    import { Enroll, Total, InfoAll, Delete } from "$bindings"
    
    import CircleNotch from "phosphor-svelte/lib/CircleNotch"
    import { onNavigate } from "$app/navigation"
    import Info from "phosphor-svelte/lib/Info"
    import { fly } from "svelte/transition"
    import { onMount } from "svelte"

    let { disabled = $bindable() } = $props()

    let fingerprint: DotLottiePlayer | null = $state(null)
    let scanning: boolean = $state(false)
    let completed: boolean = $state(true)
    let print: State = $state(states.readyToEnroll)
    let error: string | null = $state(null)

    let enrollStates = $state({
        enrolling: false,
        samples: 1,
        name: ""
    })

    function complete() {
        fingerprint?.seek(101)
        fingerprint?.pause()
    }

    async function enroll() {
        fingerprint?.stop()
        fingerprint?.play()
        
        error = null
        scanning = true
        completed = false
        print = states.enrolling
        await Enroll(enrollStates.samples, enrollStates.name)
        print = states.successfulEnroll
        scanning = false
        await wait(2000)
        completed = true
        print = states.readyToEnroll
    }

    onMount( async () => {
        let devices = await InfoAll()
        console.log(devices)
    })

    $effect(() => {
        const removeErrorListener = Events.On("error", (cb) => {
            console.log(cb)
            completed = true
            scanning = false
            error = cb.data
            return print = states.error
        })
        const removeEnrollListener = Events.On("enroll", (cb) => {
            console.log(cb)
            print = states.enrolling
            error = null
            enrollStates.enrolling = cb.data;
        })
        if (scanning) return

        complete()

        return () => {
            error = null
            scanning = true
            completed = false
            completed = true
            print = states.readyToEnroll
            removeErrorListener()
            removeEnrollListener()
        }
    })
</script>

<div class={cn("flex items-center gap-2 animate-none drop-shadow-lg select-none", scanning && "animate-pulse")}>
    {#if disabled}
        <CircleNotch size={18} weight="bold" class="animate-spin" />
        <p>Loading...</p>
    {:else}
        <print.icon size={18} weight="bold" class={cn(print.loader && "animate-spin")} />
        <p>{print.message}</p>
    {/if}
</div>
<div class={cn(
    "rounded-full flex justify-center items-center relative border border-secondary/80 select-none"
)}>
    <button
        class={cn(
            "bg-secondary/15 size-44 aspect-square rounded-full relative flex justify-center items-center cursor-pointer pointer-events-auto transition-all fill-primary/40 hover:fill-primary/60 disabled:!cursor-not-allowed disabled:pointer-events-none disabled:!opacity-50 duration-500",
            scanning ? `${shadows.enroll.active} animate-pulse duration-5000` : error ? `${shadows.error.active} animate-pulse duration-5000` : shadows.enroll.base
        )}
        onclick={enroll}
        disabled={!completed || disabled}
        aria-label="Authenticate"
    >
        <!-- Lottie animation by Rishab Agarwal on LottieFiles -->
        <!-- https://lottiefiles.com/free-animation/finger-print-scan-e7mDZqjhiL -->
        <dotlottie-player
            mode="bounce"
            subframe
            loop
            speed="1"
            src="/lottie/fingerprint-{error ? "error" : "enroll"}.json"
            class="size-[70%]"
            onready={() => complete()}
            bind:this={fingerprint}
        >
        </dotlottie-player>
    </button>
</div>
<div class="flex flex-col w-full gap-4 justify-center items-center">
    {#if error}
        <div transition:fly={{ y: -20 }} class="py-1.5 px-2 text-center select-none rounded-xl drop-shadow-lg w-full text-sm font-mono text-red-500">
            {error}
        </div>
    {/if}
    <div class="flex flex-col gap-1 w-full">
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={0} disableCloseOnTriggerClick>
                <Tooltip.Trigger class="w-fit">
                    <div class="flex items-center gap-2 w-full justify-center">
                        <Info size={16} class="fill-muted-foreground" />
                        <p class="text-muted-foreground text-sm">Samples</p>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content class="text-sm text-center w-fit max-w-60">
                    More scans can improve accuracy of the fingerprint recognition.
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
        <RangeSlider
            min={1}
            max={99}
            step={1}
            bind:value={enrollStates.samples}
            type="single"
            tooltipContent="{enrollStates.samples}/99"
        />
    </div>
    <div class="flex flex-col gap-2 w-full">
        <Label for="name" class="text-muted-foreground font-normal">Name</Label>
        <Input id="name" bind:value={enrollStates.name} />
    </div>
</div>
