<script>
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import { Button } from "$lib/components/ui/button/index";

    // determins if the button will go straight to the home page or start onboarding
    let onboarded = $state(true)
</script>

<div class="h-full flex justify-center items-center gap-4 flex-col">
    <Fingerprint size={72} weight="fill" />
    <h1 class="text-2xl font-thin">Welcome to Elan Reader</h1>
    <!-- <Fingerprint size={72} weight="thin" /> -->
    <!-- w-fit mt-8 rounded-xl transition-all bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] hover:saturate-[85%] -->
    <Button href={onboarded ? "/home" : "/onboard/1-legal"} class="w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85">
        Get Started
    </Button>
</div>