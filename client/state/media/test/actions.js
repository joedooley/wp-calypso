/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { MEDIA_DELETE } from 'state/action-types';
import { deleteMedia } from '../actions';

describe( 'actions', () => {
	describe( 'deleteMedia()', () => {
		context( 'single', () => {
			it( 'should return an action object', () => {
				const action = deleteMedia( 2916284, 42 );

				expect( action ).to.eql( {
					type: MEDIA_DELETE,
					siteId: 2916284,
					mediaIds: [ 42 ]
				} );
			} );
		} );

		context( 'array', () => {
			it( 'should return an action object', () => {
				const action = deleteMedia( 2916284, [ 42 ] );

				expect( action ).to.eql( {
					type: MEDIA_DELETE,
					siteId: 2916284,
					mediaIds: [ 42 ]
				} );
			} );
		} );
	} );
} );
