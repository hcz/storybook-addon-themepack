import {isLocalFile} from './isLocalFile';

/**
 * Retrieves iframe content
 *
 * @param {HTMLIFrameElement} iframe
 */
export const getIframeContent = (iframe: HTMLIFrameElement): Document | null | undefined => {
	const isIframe = iframe && iframe.tagName === 'IFRAME';

	if (location.origin === 'file://') {
		// Prevent CORS for local file
		return;
	}

	if (isIframe && iframe.contentWindow && isLocalFile()) {
		return iframe.contentWindow.document || iframe.contentDocument;
	}
};
