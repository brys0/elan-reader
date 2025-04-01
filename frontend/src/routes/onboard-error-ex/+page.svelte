<script>
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import USB from "phosphor-svelte/lib/Usb";
    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="w-full p-5">
    <div class="flex justify-center space-x-4">
        <div class="w-4 h-4 bg-red-500 rounded-full"></div>
        <div class="w-4 h-4 bg-white/15 rounded-full"></div>
        <div class="w-4 h-4 bg-white/15 rounded-full"></div>
    </div>
</div>
<h1 class="text-2xl font-thin">Additional Setup Required</h1>

<div class="max-w-[75%] font-light mt-4 text-center">
    <p>
        Before we can continue we need permissions to access usb devices.
        <br />
        <br />
        Once you're finished, reopen the app.
    </p>
</div>

<Button class="w-fit my-auto w-[45%] rounded-lg">Learn How</Button>
