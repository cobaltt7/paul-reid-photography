export type Photo = string;
export type Photos = Photo[];
export type Gallery = {
	slug: string;
	name: string;
	photos: Photos;
	date: {
		year: number | [number, number];
		month: number | [number, number];
		day: number | [number, number];
	};
};
export type Galleries = Gallery[];
