<script lang="ts">
    let { children } = $props();
</script>

<h1 class="text-2xl font-medium">
    {@render children?.()}
</h1>
