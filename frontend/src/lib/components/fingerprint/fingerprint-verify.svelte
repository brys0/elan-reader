<script lang="ts">
    import type DotLottiePlayer from "@aarsteinmedia/dotlottie-player-light";
    import Button from "$lib/components/ui/button/button.svelte";
    import "@aarsteinmedia/dotlottie-player-light";
    import { switcherModal } from "$lib/Stores.svelte";
    import { fade } from "svelte/transition";
    import { cn } from "$lib/utils";

    import UserSwitch from "phosphor-svelte/lib/UserSwitch";

    let {
        scanning = $bindable(),
        completed = $bindable(),
        print = $bindable(),
        disabled = $bindable(),
        onScan,
    } = $props();
    let fingerprint: DotLottiePlayer | null = $state(null);

    let shadows = {
        get hover() {
            return `hover:drop-shadow-[0px_0px_100px_rgba(96,165,250,0.8)]`;
        },
        get base() {
            return `drop-shadow-[0px_0px_80px_rgba(96,165,250,0.4)] ${this.hover}`;
        },
        get active() {
            return `drop-shadow-[0px_0px_100px_rgba(96,165,250,0.4)] ${this.hover}`;
        },
    };

    function complete() {
        fingerprint?.seek(101);
        fingerprint?.pause();
    }

    function scan() {
        fingerprint?.stop();
        fingerprint?.play();
        onScan();
    }

    $effect(() => {
        if (scanning) return;

        complete();
    });
</script>

<div
    class={cn(
        "flex items-center gap-2 animate-none drop-shadow-lg select-none",
        scanning && "animate-pulse",
    )}
>
    <print.icon
        size={18}
        weight="bold"
        class={cn(print.loader && "animate-spin")}
    />
    <p>{print.message}</p>
</div>
<div
    class="rounded-full flex justify-center items-center relative border border-secondary/80 select-none"
>
    {#if completed}
        <span in:fade={{ duration: 400 }} out:fade={{ duration: 150 }}>
            <Button
                variant="secondary"
                size="icon"
                class="absolute max-h-9 max-w-9 bottom-2 right-2 rounded-full z-[999] fill-muted-foreground hover:fill-primary transition-all"
                onclick={switcherModal.open}
            >
                <UserSwitch weight="regular" class="!size-5 fill-inherit" />
            </Button>
        </span>
    {/if}
    <button
        class={cn(
            "bg-secondary/15 size-44 aspect-square rounded-full relative flex justify-center items-center cursor-pointer pointer-events-auto transition-all fill-primary/40 hover:fill-primary/60 disabled:!cursor-not-allowed disabled:pointer-events-none disabled:!opacity-50 duration-500",
            scanning
                ? `${shadows.active} animate-pulse duration-5000`
                : shadows.base,
        )}
        onclick={scan}
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
            src="/lottie/fingerprint.json"
            class="size-[70%]"
            onready={() => complete()}
            bind:this={fingerprint}
        >
        </dotlottie-player>
    </button>
</div>
