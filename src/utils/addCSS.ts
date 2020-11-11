import {CssOperationArgs} from '../types';

/**
 * Adds style tag to the storybook component preview iframe
 *
 * @example
 *
 * // This code will add tag <style data-brand="themepack">color: red;</style> inside the iframe
 * addCSS({dataAttribute: 'brand', iframeContent, style: 'color: red;'})
 *
 */
export function addCSS({dataAttribute, iframeContent, style}: CssOperationArgs): void {
	const newStyle = document.createElement('style');
	iframeContent.head.appendChild(newStyle);
	newStyle.setAttribute(`data-${dataAttribute}`, 'themepack');
	newStyle.appendChild(document.createTextNode(`:root{${style}}`));
}
