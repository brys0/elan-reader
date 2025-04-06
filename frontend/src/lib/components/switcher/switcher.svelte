<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer";
    import { switcherModal } from "$lib/Stores.svelte";

    import Devices from "phosphor-svelte/lib/Devices";
    import Check from "phosphor-svelte/lib/Check";
    import Scan from "phosphor-svelte/lib/Scan";
    import { cn } from "$lib/utils";

    let selected = $state("ELAN ARM-M4");
    let scanners = $state(["ELAN ARM-M4", "Cortex-M0+", "STM32M33"]);

    function changeScanner(scanner: string) {
        selected = scanner;
        switcherModal.close();
    }
</script>

<Drawer.Root
    bind:open={$switcherModal}
    shouldScaleBackground
    setBackgroundColorOnScale={false}
>
    <Drawer.Content
        class="p-3 w-full min-h-[70%] max-h-[90%] rounded-t-xl border-transparent"
    >
        <Drawer.Footer class="overflow-auto flex flex-col gap-6 my-6">
            <div class="flex flex-col gap-4 w-full">
                <div class="flex items-center gap-3 w-full">
                    <div
                        class="min-w-10 aspect-square bg-secondary/40 rounded-lg drop-shadow-lg flex justify-center items-center"
                    >
                        <Scan
                            size={24}
                            weight="fill"
                            class="fill-muted-foreground"
                        />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <h2 class="leading-none font-medium">Scanner</h2>
                        <p
                            class="text-sm text-muted-foreground leading-none font-light"
                        >
                            Change the active scanner device
                        </p>
                    </div>
                </div>
                <span
                    class="h-1 w-full border-t-2 border-dashed border-secondary"
                ></span>
            </div>
            <div class="flex flex-col gap-1 w-full">
                {#each scanners as scanner}
                    <button
                        onclick={() => changeScanner(scanner)}
                        class={cn(
                            "h-10 px-3 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 fill-muted-foreground hover:fill-primary transition-all inline-flex items-center w-full cursor-pointer",
                            selected === scanner &&
                                "bg-secondary/40 fill-primary",
                        )}
                    >
                        <div
                            class="flex-grow inline-flex items-center gap-3 text-muted-foreground"
                        >
                            <Devices size={22} class="fill-inherit" />
                            <p class="text-sm text-primary">{scanner}</p>
                        </div>
                        {#if selected === scanner}
                            <Check
                                size={18}
                                weight="bold"
                                class="fill-inherit"
                            />
                        {/if}
                    </button>
                {/each}
            </div>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
