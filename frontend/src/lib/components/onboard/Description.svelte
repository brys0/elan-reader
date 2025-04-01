<script lang="ts">
    let { children } = $props();
</script>

<div class="max-w-[75%] font-light mt-4 text-center">
    {@render children?.()}
</div>
