<script lang="ts" module>
    export type Status = "complete" | "error" | "incomplete";
</script>

<script lang="ts">
    let { status = "incomplete" }: { status: Status } = $props();
</script>

{#if status === "incomplete"}
    <div class="w-4 h-4 bg-white/15 rounded-full"></div>
{:else if status === "error"}
    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
{:else}
    <div class="w-4 h-4 bg-white rounded-full"></div>
{/if}
