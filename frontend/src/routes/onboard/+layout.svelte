<script lang="ts">
    import Fingerprint from "phosphor-svelte/lib/Fingerprint";

    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<Fingerprint size={72} weight="fill" class="my-8 min-h-[72px]" />
{@render children?.()}
