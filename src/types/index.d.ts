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
export type Photos = Photo[];
export type Gallery = {
	slug: string;
	title: string;
	photos: Photos;
};
export type Galleries = Gallery[];
