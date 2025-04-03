<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer"
    import { Button } from "$lib/components/ui/button"
    import { Switch } from "$lib/components/ui/switch"
    import { Label } from "$lib/components/ui/label"
    import { settingsModal } from "$lib/Stores"

    import FingerprintSimple from "phosphor-svelte/lib/FingerprintSimple"
    import TrashSimple from "phosphor-svelte/lib/TrashSimple"
    import Unite from "phosphor-svelte/lib/Unite"
    import Scan from "phosphor-svelte/lib/Scan"

    let accel: boolean = $state(true)
    let fingerprints = $state([
        "Index Finger",
        "Left Thumb"
    ])
</script>

<Drawer.Root bind:open={$settingsModal} shouldScaleBackground setBackgroundColorOnScale={false}>
    <Drawer.Content class="p-3 w-full min-h-[70%] max-h-[90%] rounded-t-xl border-transparent">
        <Drawer.Footer class="overflow-auto flex flex-col gap-6 my-6">
            <div class="flex flex-col gap-4 w-full">
                <div class="flex items-center gap-3 w-full">
                    <div class="min-w-10 aspect-square bg-secondary/40 rounded-lg drop-shadow-lg flex justify-center items-center">
                        <Unite size={24} weight="bold" class="fill-muted-foreground" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <h2 class="leading-none font-medium">General</h2>
                        <p class="text-sm text-muted-foreground leading-none font-light">Manage your general settings</p>
                    </div>
                </div>
                <span class="h-1 w-full border-t-2 border-dashed border-secondary"></span>
            </div>
            <div class="flex items-start justify-between gap-4 w-full">
                <Label for="accel" class="flex flex-col w-full gap-1">
                    <h2 class="leading-none text-sm font-normal">Hardware Acceleration</h2>
                    <p class="text-sm text-muted-foreground leading-none font-light">
                        Use hardware acceleration for better performance.
                    </p>
                </Label>
                <Switch id="accel" bind:checked={accel} />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col w-full gap-1">
                    <h2 class="leading-none text-sm font-normal">Clear Data</h2>
                    <p class="text-sm text-muted-foreground leading-none font-light">
                        Clear all data from this app and the server.
                    </p>
                </div>
                <Button variant="destructive" class="w-full h-8">Clear</Button>
            </div>
            <div class="flex flex-col gap-4 w-full mt-5">
                <div class="flex items-center gap-3 w-full">
                    <div class="min-w-10 aspect-square bg-secondary/40 rounded-lg drop-shadow-lg flex justify-center items-center">
                        <Scan size={24} weight="fill" class="fill-muted-foreground" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <h2 class="leading-none font-medium">Scanner</h2>
                        <p class="text-sm text-muted-foreground leading-none font-light">Manage scanner settings</p>
                    </div>
                </div>
                <span class="h-1 w-full border-t-2 border-dashed border-secondary"></span>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col w-full gap-1">
                    <h2 class="leading-none text-sm font-normal">Unlink</h2>
                    <p class="text-sm text-muted-foreground leading-none font-light">
                        Remove all scanners from the app.
                    </p>
                </div>
                <Button variant="destructive" class="w-full h-8">Remove</Button>
            </div>
            <div class="flex flex-col gap-4 w-full mt-5">
                <div class="flex items-center gap-3 w-full">
                    <div class="min-w-10 aspect-square bg-secondary/40 rounded-lg drop-shadow-lg flex justify-center items-center">
                        <FingerprintSimple size={24} weight="fill" class="fill-muted-foreground" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <h2 class="leading-none font-medium">Fingerprints</h2>
                        <p class="text-sm text-muted-foreground leading-none font-light">Manage verified fingerprints</p>
                    </div>
                </div>
                <span class="h-1 w-full border-t-2 border-dashed border-secondary"></span>
            </div>
            <div class="flex flex-col gap-1 w-full">
                {#each fingerprints as print}
                    <div class="h-10 pl-3 pr-2 py-3 rounded-lg bg-secondary/20 transition-all inline-flex items-center justify-between w-full">
                        <div class="flex-grow inline-flex items-center gap-2 text-muted-foreground">
                            <FingerprintSimple size={22} class="fill-muted-foreground" />
                            <p class="text-sm text-primary">{print}</p>
                        </div>
                        <Button size="icon" variant="ghost" class="max-w-7 max-h-7">
                            <TrashSimple size={18} weight="bold" class="fill-muted-foreground" />
                        </Button>
                    </div>
                {/each}                
            </div>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>