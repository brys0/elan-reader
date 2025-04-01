<script lang="ts">
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import USB from "phosphor-svelte/lib/Usb";
    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
    import { Button } from "$lib/components/ui/button";

    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
</script>

<Steps>
    <Step status="complete" />
    <Step status="complete" />
    <Step />
</Steps>

<Header>Let's find your reader</Header>

<div class="multiselection w-full px-12 inline-flex flex-col mt-8 gap-1">
    <div
        class="select-box px-4 py-2 rounded-lg bg-neutral-900 inline-flex w-full"
    >
        <div
            class="device flex-grow inline-flex items-center gap-3 text-muted-foreground"
        >
            <Devices size={24} />
            <p>ELAN ARM-M4</p>
        </div>

        <Check size={22} />
    </div>
    <div
        class="select-box px-4 py-2 rounded-lg hover:bg-neutral-900 inline-flex w-full"
    >
        <div class="device flex-grow inline-flex items-center gap-3">
            <Devices size={24} />
            <p>Other Device</p>
        </div>

        <!-- <Check size={22} /> -->
    </div>
</div>

<a href="/onboard/3-confirm-user" class="w-[45%] my-auto">
    <Button class="w-full rounded-lg">Continue</Button>
</a>
