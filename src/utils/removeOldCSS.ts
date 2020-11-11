import {CssOperationArgs} from '../types';

/**
 * Removes style tag from the storybook component preview iframe
 *
 * @example
 *
 * // This code will remove tag <style data-brand="themepack">color: red;</style> from the iframe
 * removeOldCSS({dataAttribute: 'brand', iframeContent})
 *
 */
export function removeOldCSS({dataAttribute, iframeContent}: CssOperationArgs): void {
	const dataCSS = iframeContent.querySelectorAll(`[data-${dataAttribute}]`);

	Array.prototype.forEach.call(dataCSS, () => {
		if (dataCSS[0].parentNode) {
			dataCSS[0].parentNode.removeChild(dataCSS[0]);
		}
	});
}
