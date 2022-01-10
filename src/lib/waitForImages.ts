/** @file Wait For all images in a container to be loaded. */
/* global ImagesLoaded -- Apparently imagesLoaded defines this global type. */
import imagesLoaded from "imagesloaded";

export default async function waitForImages(
	elementSelector: ImagesLoaded.ElementSelector,
	options?: ImagesLoaded.ImagesLoadedOptions,
): Promise<ImagesLoaded.ImagesLoaded> {
	return await new Promise((resolve, reject) => {
		const loading = options
			? imagesLoaded(elementSelector, options)
			: imagesLoaded(elementSelector);

		loading.on("done", resolve);
		loading.on("fail", reject);
	});
}
