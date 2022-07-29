export type Photo = {
	city: string;
	state: string;
	country: string;
	shutterSpeed: string;
	aperture: number;
	isoSpeed: number;
	exposure: number;
	model: string;
	date: Date;
	latitude: string;
	longitude: string;
	width: number;
	height: number;
	path: string;
	isFeatured: boolean;
};

type BaseGallery = { title: string; slug: string };

type EmptyGallery = BaseGallery & { firstPhoto?: undefined; featured?: undefined };

type FullGallery = BaseGallery & { firstPhoto: Photo; featured: Photo };

export type ShallowGallery = { isFeatured: boolean } & (
	| (EmptyGallery & { photos: never[] })
	| (FullGallery & { photos: Photo[] })
);
export type NestedGallery =
	| (EmptyGallery & { galleries: never[] })
	| (FullGallery & { galleries: ShallowGallery[] });

export type Gallery = NestedGallery | ShallowGallery;
