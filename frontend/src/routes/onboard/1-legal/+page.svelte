<script lang="ts">
    import Header from "$lib/components/onboard/Header.svelte";
    import Description from "$lib/components/onboard/Description.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
</script>

<Steps>
    <Step status="complete" />
    <Step />
    <Step />
</Steps>
<div class="flex flex-col items-center overflow-y-auto">
    <Header>Terms & Conditions</Header>
    <p>Yes, boring legal jargon</p>
    <Description>
        <div class="text-left overflow-y-auto">
            Copyright © brys0 and individual contributors. All rights reserved.
            <br />
            <br />
            <p class="text-center">
                Use of this software is<br />
                <u>AT YOUR OWN RISK!</u>
            </p>
            <br />
            <p>
                1. Redistributions of source code must retain the above
                copyright notice, this list of conditions and the following
                disclaimer.
            </p>
            <p>
                2. Redistributions of source code must retain the above
                copyright notice, this list of conditions and the following
                disclaimer.
            </p>

            <br />
            THIS SOFTWARE IS PROVIDED "AS IS" AND UNDER NO CIRCUMSTANCE SHALL THE
            COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTIAL,
            SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
            TO, LOSS OF DATA, DAMAGE TO DEVICES, OR "BRICKING" OF ANY DEVICE)

            <br />
            <br />
            By continuing you understand and accept any risk with using this software
            <br />
            <br />
        </div>
    </Description>

    <a href="/onboard/2-select-device" class="w-[75%]">
        <Button class="w-full my-4">Continue</Button>
    </a>
</div>
