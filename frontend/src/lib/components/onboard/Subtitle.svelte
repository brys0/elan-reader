<script lang="ts">
    let { children } = $props()
</script>

<h3 class="text-muted-foreground font-light text-sm text-center">
    {@render children?.()}
</h3>