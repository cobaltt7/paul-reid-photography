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
	firstPhoto: Photo;
	featured: Photo;
};

export type ShallowGallery = BaseGallery & {
	isFeatured: boolean;
	photos: Photos;
	galleries: undefined;
};

export type NestedGallery = BaseGallery & {
	galleries: ShallowGallery[];
	photos: undefined;
};

export type Gallery = ShallowGallery | NestedGallery;
