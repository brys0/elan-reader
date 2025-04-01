<script>
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import { Button } from "$lib/components/ui/button/index";
    //    import BackgroundBeams from "$lib/components/ui/BackgroundBeams/index";
</script>

<div class="h-full flex justify-center items-center gap-4 flex-col">
    <Fingerprint size={72} weight="fill" />
    <h1 class="text-2xl font-thin">Welcome to Elan Reader</h1>
    <!-- <Fingerprint size={72} weight="thin" /> -->
    <!-- w-fit mt-8 rounded-xl transition-all bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] hover:saturate-[85%] -->
    <a href="/onboard/1-legal">
        <Button class="w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85"
            >Get Started</Button
        >
    </a>
</div>

<style>
</style>
