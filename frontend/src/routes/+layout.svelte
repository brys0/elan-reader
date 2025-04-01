<script lang="ts">
    import "@fontsource-variable/onest";
    import "../app.css";

    import PageTransition from "$lib/components/transitions/PageTransition.svelte";
    // import type { LayoutProps } from "svelte-motion";
    interface Props {
        children?: import("svelte").Snippet;
        data: {
            pathname: string;
        };
    }

    let { data, children }: Props = $props();
</script>

<div class="bg-background max-h-[100dvh] overflow-hidden w-full">
    <PageTransition pathname={data.pathname}>
        {@render children?.()}
    </PageTransition>
</div>
