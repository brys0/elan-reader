<script lang="ts">
    import { DotLottieSvelte, type DotLottie } from "@lottiefiles/dotlottie-svelte"
    import { cn } from "$lib/utils";

    let { scanning = $bindable(), completed = $bindable(), onScan } = $props()
    let fingerprint: DotLottie | null = null

    let shadows = {
        get hover() {
            return `hover:drop-shadow-[0px_0px_100px_rgba(96,165,250,0.8)]`
        },
        get base() {
            return `drop-shadow-[0px_0px_80px_rgba(96,165,250,0.4)] ${this.hover}`
        },
        get active() {
            return `drop-shadow-[0px_0px_100px_rgba(96,165,250,0.4)] ${this.hover}`
        }
    }
    function scan() {
        fingerprint?.stop()
        fingerprint?.play()
        onScan()
    }
    $effect(() => {
        if (!scanning) fingerprint?.stop()
    })
</script>

<div class="rounded-full flex justify-center items-center relative border border-secondary/80">
    <button
        class={cn(
            "bg-secondary/15 size-44 aspect-square rounded-full relative flex justify-center items-center cursor-pointer pointer-events-auto transition-all fill-primary/40 hover:fill-primary/60 disabled:pointer-events-none disabled:opacity/50 duration-500",
            scanning ? `${shadows.active} animate-pulse duration-5000` : shadows.base
        )}
        onclick={scan}
        disabled={!completed}
    >
        <DotLottieSvelte
            src="/lottie/fingerprint.lottie"
            dotLottieRefCallback={(ref) => fingerprint = ref}
            loop
        />
    </button>
</div>