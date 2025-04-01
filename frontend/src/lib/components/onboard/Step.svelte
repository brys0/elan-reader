<script lang="ts" module>
    export type Status = "complete" | "error" | "incomplete";
</script>

<script lang="ts">
    import { cn } from "$lib/utils"
    let { status = "incomplete" }: { status?: Status } = $props();

    let background = {
        complete: "bg-white",
        error: "bg-red-500",
        incomplete: "bg-white/15",
    }
</script>

<div class={cn("w-4 h-4 rounded-full", background[status])}></div>
