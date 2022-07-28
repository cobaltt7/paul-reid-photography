import fileSystem from "fs/promises";
import path from "path";
import url from "url";

import exifr from "exifr";
import Fraction from "fraction.js";
import sizeOf from "image-size";
import slugify from "slugify";

import type { Gallery, ShallowGallery } from "./types/galleries";

export const PUBLIC_DIR = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "static");
export const PHOTOS_DIR = path.resolve(PUBLIC_DIR, "imgs/photos");

const SLUGIFY_OPTIONS = { lower: true, strict: true };

/**
 * Get all subdirectories of a directory.
 *
 * @param pathToScan - Path to scan for galleries.
 *
 * @returns - Array of subdirectories.
 */
async function getDirectoryChildren(pathToScan: string): Promise<string[]> {
	const files = await fileSystem.readdir(pathToScan);

	// Filter out non-directories
	return (
		await Promise.all(
			files.map(async (gallery) => {
				const resolvedPath = path.resolve(pathToScan, gallery);

				return {
					gallery: resolvedPath,
					isDirectory: (await fileSystem.lstat(resolvedPath)).isDirectory(),
				};
			}),
		)
	)
		.filter(({ isDirectory }) => isDirectory)
		.map(({ gallery }) => gallery);
}

/**
 * Load EXIF data from a photo.
 *
 * @param photoPath - Path to the photo.
 *
 * @returns EXIF data.
 */
async function loadExif(photoPath: string): Promise<{
	aperture: number;
	city: string;
	country: string;
	date: Date;
	exposure: number;
	height: number;
	isoSpeed: number;
	latitude: string;
	longitude: string;
	model: string;
	shutterSpeed: string;
	state: string;
	width: number;
}> {
	const file = await fileSystem.readFile(photoPath);
	const dimensions = sizeOf(file);
	const exif = await exifr.parse(file, true);

	return {
		aperture: +exif.ApertureValue,
		city: exif.City,
		country: exif.Country,
		date: exif.CreateDate,
		exposure: +exif.ExposureCompensation,
		height: dimensions.height ?? 0,
		isoSpeed: +exif.ISO,
		latitude: exif.latitude,
		longitude: exif.longitude,
		model: exif.Model,
		shutterSpeed: new Fraction(exif.ExposureTime).toFraction(),
		state: exif.State,
		width: dimensions.width ?? 0,
	};
}

/**
 * Generate data for galleries.
 *
 * @param directories - Directories to scan.
 * @param shallow - Whether to allow subgalleries. Defaults to `false`.
 *
 * @returns - Array of gallery data.
 */
async function generateGalleryData<Shallow extends boolean>(
	directories: string[],
	shallow?: Shallow,
): Promise<(Shallow extends true ? ShallowGallery : Gallery)[]> {
	const promises = directories.map(
		/**
		 * Load data for a single gallery.
		 *
		 * @param directory - Directory of the gallery.
		 *
		 * @returns - Gallery data.
		 */ async (directory: string): Promise<Gallery> => {
			// Load data from the folder title.
			const titleArray = path.basename(directory).split(",");
			const isFeatured = Boolean(titleArray[0]);
			const title = (titleArray[0] || titleArray[1] || "").trim();
			const slug = `/${slugify(title, SLUGIFY_OPTIONS)}`;

			const folderChildren = (await fileSystem.readdir(directory)).map((folderChild) =>
				path.resolve(directory, folderChild),
			);

			if (!(shallow ?? false) && typeof folderChildren[0] === "string") {
				const isNested = (await fileSystem.lstat(folderChildren[0])).isDirectory();

				if (isNested) {
					const galleries = await generateGalleryData(folderChildren, true);
					const featuredGallery =
						galleries.find((gallery) => gallery.isFeatured) ?? galleries[0];

					if (!galleries[0]?.firstPhoto || !featuredGallery?.firstPhoto)
						return { galleries: [], slug, title };

					/** @type {import("./types/galleries").NestedGallery} */
					return {
						featured: featuredGallery.featured,
						firstPhoto: galleries[0].firstPhoto,
						galleries,
						slug,
						title,
					};
				}
			}

			/** Load photos, remove non-images, sort. */
			const photoNames = folderChildren
				.filter((photo) => path.extname(photo) === ".jpg")
				.sort((one, two) => +one - +two);

			const photos = (
				await Promise.all(
					photoNames.map(async (photo) => {
						const photoPath = path.resolve(directory, photo);

						return {
							...(await loadExif(photoPath)),
							isFeatured: path.basename(photoPath).endsWith(",.jpg"),
							path: `/${path.relative(PUBLIC_DIR, photoPath).replaceAll("\\", "/")}`,
						};
					}),
				)
			).sort((photoOne, photoTwo) => +photoOne.date - +photoTwo.date);

			const featured = photos.find((photo) => photo.isFeatured) ?? photos[0];

			if (!photos[0] || !featured) return { isFeatured, photos: [], slug, title };

			/** @type {import("./types/galleries").ShallowGallery} */
			return {
				featured,
				firstPhoto: photos[0],
				isFeatured,
				photos,
				slug,
				title,
			};
		},
	);

	return (await Promise.all(promises))
		.filter((gallery) => {
			if ("galleries" in gallery && gallery.galleries.length > 0) return true;

			if ("photos" in gallery && gallery.photos.length > 0) return true;

			return false;
		})
		.sort(
			(galleryOne, galleryTwo) =>
				+(galleryTwo.firstPhoto?.date ?? 0) - +(galleryOne.firstPhoto?.date ?? 0),
		);
}

/**
 * Fetch galleries in a directory.
 *
 * @param directory - Directory to scan.
 *
 * @returns - Gallery data.
 */
export default async function fetchGalleries(directory: string): Promise<Gallery[]> {
	return await getDirectoryChildren(directory).then(generateGalleryData);
}
