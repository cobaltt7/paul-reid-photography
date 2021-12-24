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
	latitude: number;
	longitude: number;
	width: number;
	height: number;
	path: string;
};

type BaseGallery = {
	title: string;
	slug: string;
};
type EmptyGallery = BaseGallery & {
	firstPhoto?: undefined;
	featured?: undefined;
};
type FullGallery = BaseGallery & {
	firstPhoto: Photo;
	featured: Photo;
};

export type ShallowGallery = {
	isFeatured: boolean;
} & ((FullGallery & { photos: Photo[] }) | (EmptyGallery & { photos: never[] }));
export type NestedGallery =
	| (FullGallery & { galleries: ShallowGallery[] })
	| (EmptyGallery & { galleries: never[] });

export type Gallery = ShallowGallery | NestedGallery;
