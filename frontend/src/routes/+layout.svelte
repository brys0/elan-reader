<script lang="ts">
    import PageTransition from "$lib/components/transitions/PageTransition.svelte"
    import { Settings } from "$lib/components/settings"
    import { Switcher } from "$lib/components/switcher"
    import "@fontsource-variable/space-grotesk"
    import "@fontsource-variable/onest"
    import "../app.css"

    let { children } = $props()
</script>

<!-- Modals -->
<Settings />
<Switcher />

<div data-vaul-drawer-wrapper class="bg-background max-h-[100dvh] overflow-hidden w-full">
    <PageTransition>
        {@render children?.()}
    </PageTransition>
</div>
