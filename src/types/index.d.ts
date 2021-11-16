export type Photo = string;
export type Photos = Photo[];
export type Gallery = {
	slug: string;
	title: string;
	photos: Photos;
	date: {
		year: number;
		month: number;
		day: number;
	};
};
export type Galleries = Gallery[];
