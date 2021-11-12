<template>
	<!-- <List galleries="galleries"/> -->
	<div style="grid-auto-rows: 6rem" class="grid grid-flow-row-dense grid-cols-3 gap-5">
		<a
			v-for="i in galleries"
			:data-index="i"
			class="
				inline-block
				border border-solid border-black
				hover:no-underline
				no-underline
				group
				relative
				gallery
			"
			:key="i.slug"
			:href="i.slug"
			><h6 class="group-hover:no-underline">
				{{ i.title }}
			</h6>
			<img :src="i.photos[0]" />
			<i class="group-hover:color-inherit absolute bottom-0 color-i">{{ i.date }}</i>
		</a>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { Galleries } from "../types";
	// import type {NodeListOf} from "/../../../node_modules/@types/node";
	// import List from "../components/List.vue";

	@Component
	export default class List extends Vue {
		/** @readonly */
		@Prop() galleries!: Galleries;

		observer = new ResizeObserver((entries) =>
			window.requestAnimationFrame(() =>
				entries.forEach(({ target }) =>
					this.setRowSpan(target.parentElement as HTMLAnchorElement),
				),
			),
		);

		mounted(): void {
			for (const element of this.$el.querySelectorAll(
				"a.gallery",
			) as NodeListOf<HTMLAnchorElement>) {
				this.setRowSpan(element);
				for (const el of element.children) {
					this.observer.observe(el, {
						box: "border-box",
					});
				}
			}
		}

		setRowSpan(el: HTMLAnchorElement): string {
			let height = 0;

			[...el.children].forEach((child) => {
				height += Math.abs(child.getBoundingClientRect().height);
			});

			return (el.style.gridRowEnd = `span ${Math.ceil(height / 100) || 1}`);
		}
	}
</script>

<style scoped></style>
