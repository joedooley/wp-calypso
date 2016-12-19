/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { keyBy, omit } from 'lodash';

/**
 * Internal dependencies
 */
import { MEDIA_DELETE, MEDIA_RECEIVE } from 'state/action-types';
import { keyedReducer, createReducer } from 'state/utils';

export const items = keyedReducer( 'siteId', createReducer( {}, {
	[ MEDIA_RECEIVE ]: ( state, action ) => {
		return {
			...state,
			...keyBy( action.media, 'ID' )
		};
	},
	[ MEDIA_DELETE ]: ( state, action ) => {
		return omit( state, action.mediaIds );
	}
} ) );

export default combineReducers( {
	items
} );
