export type galleries = {
	slug: string;
	name: string;
	photos: string[];
	date: {
		year: number | [number, number];
		month: number | [number, number];
		day: number | [number, number];
	};
}[];
