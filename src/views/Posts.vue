<template>
	<!-- <List galleries="galleries"/> -->
	<div
		style="
			grid-auto-rows: 6rem;
		"
		class="grid grid-flow-row-dense grid-cols-3 gap-5"
	>
		<a
			v-for="i in galleries"
			:data-index="i"
			class="inline-block border border-solid border-black no-underline relative"
			:key="i.slug"
			:href="i.slug"
			><h6>
				{{ i.title }}
			</h6>
			<img :src="i.photos[0]" />
			<i class="absolute bottom-0">{{ i.date }}</i>
		</a>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { Galleries } from "../types";
	// import List from "../components/List.vue";

	function setRowSpan(el: HTMLElement) {
		let height = 0;

		[...(el.parentElement?.children || [])].forEach((child) => {
			height += Math.abs(child.getBoundingClientRect().height);
		});

		return ((el.parentElement || el).style.gridRowEnd = `span ${Math.ceil(height / 100) || 1}`);
	}

	@Component
	export default class List<T extends HTMLElement = HTMLAnchorElement> extends Vue {
		/** @readonly */
		@Prop() galleries!: Galleries;
		observer = new ResizeObserver((entries) =>
			window.requestAnimationFrame(() =>
				entries.forEach(({ target }) => setRowSpan(target as T)),
			),
		);

		mounted(): void {
			for (const element of this.$el.children as T[] & HTMLCollection) {
				for (const el of element.children as T[] & HTMLCollection) {
					setRowSpan(el);
					this.observer.observe(el, {
						box: "border-box",
					});
				}
			}
		}
		imgLoad(event: Event): void {
			setRowSpan((event.target as HTMLImageElement).parentElement as T);
		}
		log = console.log;
		func(a: string): void {
			console.log(document.getElementById(a));
		}
	}
</script>

<style scoped>
</style>
