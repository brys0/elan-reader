<script lang="ts">
    import { Slider, type WithoutChildren } from "bits-ui"
	import type { ComponentProps } from "svelte"
	import * as Tooltip from "$shadcn/tooltip"

	type Props = WithoutChildren<ComponentProps<typeof Slider.Root> & {
		tooltipContent: string
	}>

	let { value = $bindable(), ref = $bindable(null), ...restProps }: Props = $props()
</script>

<!--
 Since we have to destructure the `value` to make it `$bindable`, we need to use `as any` here to avoid
 type errors from the discriminated union of `"single" | "multiple"`.
 (an unfortunate consequence of having to destructure bindable values)
-->

<Tooltip.Provider>
	<Tooltip.Root delayDuration={0} disableCloseOnTriggerClick>
		<Tooltip.Trigger class="w-full">
			<div class="w-full flex items-center">
				<span class="text-sm text-primary/50 font-extralight mr-4">
					{restProps.min}
				</span>
				<Slider.Root
					class="relative flex w-full touch-none select-none items-center"
					bind:value
					bind:ref
					{...restProps as any}
				>
					{#snippet children({ thumbs })}
						<span
					        class="bg-secondary relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
						>
							<Slider.Range class="bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end absolute h-full" />
						</span>
						{#each thumbs as index}
							<Slider.Thumb
								class="bg-primary hover:opacity-90 focus-visible:ring-foreground focus-visible:outline-hidden block size-4 cursor-pointer rounded-full border shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-offset-1 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
								{index}
							/>
						{/each}
					{/snippet}
				</Slider.Root>
				<span class="text-sm text-primary/50 font-extralight ml-2">
					{restProps.max}
				</span>
			</div>
			<Tooltip.Content>
		    	<p>{restProps.tooltipContent}</p>
		    </Tooltip.Content>
		</Tooltip.Trigger>
	</Tooltip.Root>
</Tooltip.Provider>