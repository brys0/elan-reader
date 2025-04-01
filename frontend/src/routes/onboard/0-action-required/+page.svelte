<script>
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import { Button } from "$lib/components/ui/button";
    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
    import USB from "phosphor-svelte/lib/Usb";

    // Onboard components
    import Description from "$lib/components/onboard/Description.svelte";
    import Subtitle from "$lib/components/onboard/Subtitle.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
</script>


<Header>Additional Setup Required</Header>
<Subtitle>This is to ensure that elan reader works properly.</Subtitle>

<Steps>
    <Step status="complete" />
    <Step />
    <Step />
</Steps>

<Description>
    <div class="w-full gap-4 flex flex-col">
        <p>Before we can continue we need permission to access usb devices.</p>
        <p>Once you're finished, reopen the app.</p>
    </div>
</Description>

<Button class="w-3/4 my-auto !text-primary-foreground">Learn How</Button>
