/**
 * External Dependencies
 */
import photon from 'photon';
import { parse as parseUrl } from 'url';

/**
 * Regular expression pattern strings to be used in exempting URLs by prefix:
 * relative URLs, inline images, or local file URLs (in browser context).
 *
 * @type {String[]}
 */
const safePrefixPatterns = [ '\/(?!\/)', 'data:image\/[^;]+;' ];
if ( 'object' === typeof location ) {
	// See: https://w3c.github.io/FileAPI/#blob-url
	const { protocol, hostname, port } = location;
	safePrefixPatterns.push( `blob:${ protocol }\/\/${ hostname }${ port ? ':' + port : '' }\/` );
}

/**
 * Pattern matching URLs to be left unmodified.
 *
 * @type {RegExp}
 */
const REGEX_EXEMPT_URL = new RegExp( `^(${ safePrefixPatterns.join( '|' ) })` );

/**
 * Pattern matching Automattic-controlled hostnames
 *
 * @type {RegExp}
 */
const REGEXP_A8C_HOST = /^([-a-zA-Z0-9_]+\.)*(gravatar\.com|wordpress\.com|wp\.com|a8c\.com)$/;

/**
 * Generate a safe version of the provided URL
 *
 * Images that Calypso uses have to be provided by a trusted TLS host. To do
 * this, we check the host of the URL against a whitelist, and run the image
 * through photon if the host name does not match.
 *
 * @param  {string} url The URL to secure
 * @return {string}     The secured URL, or null if we couldn't make it safe
 */
export default function safeImageUrl( url ) {
	if ( typeof url !== 'string' ) {
		return null;
	}

	if ( REGEX_EXEMPT_URL.test( url ) ) {
		return url;
	}

	const { hostname } = parseUrl( url, false, true );
	if ( REGEXP_A8C_HOST.test( hostname ) ) {
		// Safely promote Automattic domains to HTTPS
		return url.replace( /^http:/, 'https:' );
	}

	return photon( url );
}
