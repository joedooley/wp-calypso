/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import safeImageUrl from 'lib/safe-image-url';

/**
 * Returns a media object by site ID, media ID, or null if not known
 *
 * @param  {Object}  state   Global state tree
 * @param  {Number}  siteId  Site ID
 * @param  {Number}  mediaId Media ID
 * @return {?Object}         Media object, if known
 */
export function getMediaItem( state, siteId, mediaId ) {
	return get( state.media.items, [ siteId, mediaId ], null );
}

/**
 * Returns the URL for a media item, or null if not known
 *
 * @param  {Object}  state   Global state tree
 * @param  {Number}  siteId  Site ID
 * @param  {Number}  mediaId Media ID
 * @return {?String}         Media URL, if known
 */
export function getMediaUrl( state, siteId, mediaId ) {
	const media = getMediaItem( state, siteId, mediaId );
	if ( ! media ) {
		return null;
	}

	return safeImageUrl( media.URL );
}
