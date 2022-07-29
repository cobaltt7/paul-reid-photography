import type { Photo, NestedGallery } from "./galleries";

export type PageMeta = {
	readonly gallery?: { readonly featured?: Photo; readonly parent?: NestedGallery };

	readonly page: { readonly description: string; readonly title?: string };
};

type AllGalleryMeta = { parent?: string };

export type HeadInfo = {
	gallery?:
		| (AllGalleryMeta & {
				empty: false;
				featured: string;

				location: {
					city: string;
					country: string;
					latitude: string;
					longitude: string;
					state: string;
				};
		  })
		| (AllGalleryMeta & { empty: true });

	page: {
		computedTitle: string;

		description?: string;
		siteTitle: string;
		url: string;
	};
};
