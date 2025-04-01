<script lang="ts">
    import Description from "$lib/components/onboard/Description.svelte";
    import Subtitle from "$lib/components/onboard/Subtitle.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
</script>

<Header>User</Header>
<Subtitle>Did we find the correct user?</Subtitle>

<Steps>
    <Step status="complete" />
    <Step status="complete" />
    <Step status="complete" />
</Steps>

<Description class="flex flex-col gap-2 overflow-y-auto">
    <div class="flex items-center gap-2 w-full justify-between bg-secondary/40 py-2 px-2.5 rounded-xl">
        <h2 class="font-semibold text-xl">Brys0</h2>
        <h3 class="font-medium text-muted-foreground px-2.5 py-1.5 bg-secondary/80 rounded-lg text-sm">UID 1000</h3>
    </div>
    <span class="w-full h-0.5 bg-muted-foreground/5 my-4"></span>
    <p class="text-primary/80 text-sm">Your fingerprints will be automatically associated with this account. Don't worry, you can change users at any time.</p>
</Description>

<Button class="w-3/4 my-auto !text-primary-foreground" href="/home">Finish</Button>
