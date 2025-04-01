<script lang="ts">
    import PageTransition from "$lib/components/transitions/PageTransition.svelte"
    import "@fontsource-variable/space-grotesk"
    import "@fontsource-variable/onest"
    import "../app.css"

    let { children } = $props()
</script>

<div class="bg-background max-h-[100dvh] overflow-hidden w-full">
    <PageTransition>
        {@render children?.()}
    </PageTransition>
</div>
