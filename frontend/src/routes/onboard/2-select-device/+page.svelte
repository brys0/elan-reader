<script lang="ts">
    import Subtitle from "$lib/components/onboard/Subtitle.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
    import { Button } from "$lib/components/ui/button";
    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
</script>

<Header>Device</Header>
<Subtitle>Let's find your reader</Subtitle>

<Steps>
    <Step status="complete" />
    <Step status="complete" />
    <Step />
</Steps>

<div class="multiselection w-full px-12 inline-flex flex-col mt-8 gap-1">
    <div
        class="select-box px-3 py-2 rounded-lg bg-neutral-900 inline-flex items-center w-full cursor-pointer"
    >
        <div
            class="device flex-grow inline-flex items-center gap-3 text-muted-foreground"
        >
            <Devices size={24} class="fill-primary" />
            <p class="text-sm text-primary">ELAN ARM-M4</p>
        </div>

        <Check size={18} weight="bold" />
    </div>
    <div
        class="select-box px-3 py-2 rounded-lg hover:bg-neutral-900 transition-colors inline-flex items-center w-full cursor-pointer"
    >
        <div class="device flex-grow inline-flex items-center gap-3">
            <Devices size={24} class="fill-muted-foreground" />
            <p class="text-sm text-muted-foreground">Other Device</p>
        </div>

        <!-- <Check size={18} weight="bold" /> -->
    </div>
</div>

<Button class="w-3/4 my-auto !text-primary-foreground" href="/onboard/3-confirm-user">Continue</Button>