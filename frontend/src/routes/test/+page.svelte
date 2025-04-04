<script lang="ts">
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";
    import { Button } from "$lib/components/ui/button/index";
    import { Events } from "@wailsio/runtime";

    import {
        Verify,
        Enroll,
    } from "$bindings";

    let verifyState = $state(null as any);
    let enrollState = $state(null as any);
    let currentErrorState = $state(null as any);

    // Svelte complains because a number back to the enum name causes more intense type analysis and processing
    enum BackendStates {
        SAMPLE_VALID = 0,

        ERROR_SLIGHT_DOWN = 1,
        ERROR_SLIGHT_RIGHT = 2,
        ERROR_SLIGHT_UP = 3,
        ERROR_SLIGHT_LEFT = 4,
        ERROR_SENSOR_DIRTY = 5,
        ERROR_UNENROLLED = 6,
        ERROR_AREA_TOO_SMALL = 7,
        ERROR_MAX_ENROLLED = 8,
        ERROR_UNKNOWN = 9,
    }

    async function verify() {
        try {
            verifyState = await Verify();
        } catch (e: any) {
            console.log("Verify error", e);
        }
    }

    async function enroll() {
        await Enroll(50, "rand string data");
    }

    // An error occured at some command that lets a user recieve feedback before it completes
    Events.On("error", (cb) => {
        const state = BackendStates[cb.data];
        console.error("Error from backend", cb, state);

        currentErrorState = state;
    });

    Events.On("enroll", (cb) => {
        console.log("Enroll", cb);

        enrollState = cb.data;
    });
</script>

<div class="h-full flex justify-center items-center gap-4 flex-col">
    <Fingerprint size={72} weight="fill" />
    <h1 class="text-2xl font-thin">Test mock reader</h1>

    <p>
        Enrollment State: {enrollState}
    </p>

    <p>
        Verify State: {verifyState}
    </p>

    <p>
        Last Error: {currentErrorState}
    </p>
    <!-- <Fingerprint size={72} weight="thin" /> -->
    <!-- w-fit mt-8 rounded-xl transition-all bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] hover:saturate-[85%] -->
    <Button
        onclick={verify}
        class="w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85"
    >
        Verify
    </Button>
    <Button
        onclick={enroll}
        class="w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85"
    >
        Enroll
    </Button>
</div>
