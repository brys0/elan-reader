<script lang="ts">
    import Description from "$lib/components/onboard/Description.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<Steps>
    <Step status="complete" />
    <Step status="complete" />
    <Step status="complete" />
</Steps>

<Header>Is this the correct user?</Header>

<Description>
    <h2 class="mb-3 font-semibold text-2xl">Brys0 (UID 1000)</h2>
    <p>
        Your fingerprints will be automatically associated with this account.
        <br />
        <br />
        Don't worry, you can change users at any time.
    </p>
</Description>

<a href="/" class="w-[45%] my-auto">
    <Button class="w-full rounded-lg">Continue</Button>
</a>
