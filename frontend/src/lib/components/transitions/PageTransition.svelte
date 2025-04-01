<script lang="ts">
    import { fly } from "svelte/transition";
    export let pathname: string = "";
</script>

{#key pathname}
    <div
        class="bg-background h-[100dvh] w-full flex justify-top items-center flex-col"
        in:fly={{ x: -10, duration: 250, delay: 300 }}
        out:fly={{ x: 5, duration: 300 }}
    >
        <slot />
    </div>
{/key}
