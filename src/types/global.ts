/** @file Define Global types. */

import type { Gallery } from "./galleries";

declare global {
	/**
	 * Don't use! Always import `galleries` from `/types/global` instead.
	 *
	 * @private
	 */

	const _galleries: readonly Gallery[];
}

// eslint-disable-next-line import/prefer-default-export -- We don't want to export default this.
export const galleries = _galleries;
