/**
 * Strip a trailing slash (or any character) from the end of a string.
 *
 * @file Strip A trailing slash (or any character) from the end of a string.
 *
 * @param string - The string to strip from.
 * @param character - The character to strip. Defaults to a trailing slash.
 *
 * @returns String without the trailing character.
 */
export default function stripTrailingSlash(string: string, character = "/"): string {
	return string.endsWith(character) ? string.slice(0, -1) : string;
}
