<script lang="ts">
    import Description from "$lib/components/onboard/Description.svelte";
    import Subtitle from "$lib/components/onboard/Subtitle.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Header from "$lib/components/onboard/Header.svelte";
    import Steps from "$lib/components/onboard/Steps.svelte";
    import Step from "$lib/components/onboard/Step.svelte";
</script>

<Header>Terms & Conditions</Header>
<Subtitle>Yes, boring legal jargon</Subtitle>

<Steps>
    <Step status="complete" />
    <Step />
    <Step />
</Steps>

<div class="flex flex-col items-center overflow-y-auto">
    <!-- <Header>Terms & Conditions</Header> -->
    <!-- <p class="text-muted-foreground font-light text-sm">Yes, boring legal jargon</p> -->
    <Description>
        <!-- <div class="text-left overflow-y-auto">
            <p class="text-center">
                Copyright © brys0 and individual contributors. All rights reserved.
            </p>
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
        </div> -->
        <div class="text-left overflow-y-auto flex flex-col w-full gap-4">
            <p class="text-center text-primary/80 text-sm">
                Copyright © brys0 and individual contributors. All rights reserved.
            </p>
            <p class="text-center font-medium">
                Use of this software is
                <u>AT YOUR OWN RISK!</u>
            </p>
            <span class="w-full h-0.5 bg-muted-foreground/5 my-2"></span>
            <p class="text-sm">
                1. Redistributions of source code must retain the above
                copyright notice, this list of conditions and the following
                disclaimer.
            </p>
            <p class="text-sm">
                2. Redistributions of source code must retain the above
                copyright notice, this list of conditions and the following
                disclaimer.
            </p>
            <p class="text-sm">
                THIS SOFTWARE IS PROVIDED "AS IS" AND UNDER NO CIRCUMSTANCE SHALL THE
                COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTIAL,
                SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
                TO, LOSS OF DATA, DAMAGE TO DEVICES, OR "BRICKING" OF ANY DEVICE)
            </p>
            <span class="w-full h-0.5 bg-muted-foreground/5 my-2"></span>
            <p class="text-sm">
                By continuing you understand and accept any risk with using this software
            </p>
        </div>
    </Description>

    <Button class="w-3/4 my-4 !text-primary-foreground" href="/onboard/2-select-device">Continue</Button>
</div>
