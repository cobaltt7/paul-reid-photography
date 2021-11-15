import imagesLoaded from "imagesloaded";

export default function waitForImages(
	elementSelector: ImagesLoaded.ElementSelector,
	options?: ImagesLoaded.ImagesLoadedOptions,
): Promise<ImagesLoaded.ImagesLoaded> {
	return new Promise((resolve, reject) => {
		const loading = options
			? imagesLoaded(elementSelector, options)
			: imagesLoaded(elementSelector);
		loading.on("done", resolve);
		loading.on("fail", reject);
		return loading;
	});
}
