<script>
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import USB from "phosphor-svelte/lib/Usb";
    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
    import { Button } from "$lib/components/ui/button";

    // Onboard components
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Description from "$lib/components/onboard/Description.svelte";
</script>

<Steps>
    <Step status="error" />
    <Step />
    <Step />
</Steps>

<Header>Additional Setup Required</Header>

<Description>
    <p>
        Before we can continue we need permission to access usb devices.
        <br />
        <br />
        Once you're finished, reopen the app.
    </p>
</Description>

<Button class="w-fit my-auto w-[45%] rounded-lg">Learn How</Button>
