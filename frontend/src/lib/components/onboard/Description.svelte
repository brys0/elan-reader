<script lang="ts">
    import { cn } from "$lib/utils";
    let { children, class: className = "" } = $props();
</script>

<div class={cn("max-w-[75%] font-light mt-4 text-center", className)}>
    {@render children?.()}
</div>
