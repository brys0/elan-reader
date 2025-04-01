<script lang="ts">
    let { children } = $props();
</script>

<div class="w-full p-5">
    <div class="flex justify-center space-x-4">
        {@render children?.()}
    </div>
</div>
