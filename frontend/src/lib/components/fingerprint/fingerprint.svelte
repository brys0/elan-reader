<script lang="ts">
    import "@aarsteinmedia/dotlottie-player-light";
    import type DotLottiePlayer from "@aarsteinmedia/dotlottie-player-light";
    import { cn } from "$lib/utils";

    // We cant use the type from @aarsteinmedia/dotlottie-player-light
    // because we access a private field "_lottieInstance"
    interface LottiePlayer {
        play: () => void;
        pause: () => void;
        stop: () => void;

        _lottieInstance: {
            goToAndStop: (position: number, isFrames: boolean) => void;
        };
    }

    let { scanning = $bindable(), completed = $bindable(), onScan } = $props();
    let fingerprint: LottiePlayer | null = $state(null);

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
        // Unfortunately lottie-player-lite doesn't give us access to the "goToAndStop" command
        // However we need this to properly stop at the end of the animation for when the scanning finishes
        // Otherwise we stop at the start of the animation, which is just empty.
        fingerprint?._lottieInstance?.goToAndStop(101, true);
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
    class="rounded-full flex justify-center items-center relative border border-secondary/80 select-none"
>
    <button
        class={cn(
            "bg-secondary/15 size-44 aspect-square rounded-full relative flex justify-center items-center cursor-pointer pointer-events-auto transition-all fill-primary/40 hover:fill-primary/60 disabled:pointer-events-none disabled:opacity/50 duration-500",
            scanning
                ? `${shadows.active} animate-pulse duration-5000`
                : shadows.base,
        )}
        onclick={scan}
        disabled={!completed}
        aria-label="Authenticate"
    >
        <dotlottie-player
            mode="bounce"
            subframe
            loop
            speed="1"
            src="/lottie/fingerprint.lottie"
            class="size-[70%]"
            onready={() => complete()}
            bind:this={fingerprint as any}
        >
        </dotlottie-player>
    </button>
</div>
