import {IFRAME_ID} from '../constants';
import {getIframeContent} from './getIframeContent';
import {removeOldCSS} from './removeOldCSS';
import {addCSS} from './addCSS';

/**
 * Updates iframe styles
 */
export const updateIframe = (name: string, css?: string): void => {
	const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
	const iframeContent = getIframeContent(iframe);

	if (iframeContent) {
		removeOldCSS({dataAttribute: name, iframeContent});

		if (css) {
			addCSS({dataAttribute: name, iframeContent, style: css});
		}
	}
};
