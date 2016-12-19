/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getMediaItem, getMediaUrl } from '../selectors';

describe( 'selectors', () => {
	describe( 'getMediaItem()', () => {
		it( 'should return null if the site is not in state', () => {
			const item = getMediaItem( {
				media: {
					items: {}
				}
			}, 2916284, 42 );

			expect( item ).to.be.null;
		} );

		it( 'should return null if the media for the site is not in state', () => {
			const item = getMediaItem( {
				media: {
					items: {
						2916284: {}
					}
				}
			}, 2916284, 42 );

			expect( item ).to.be.null;
		} );

		it( 'should return the media item', () => {
			const item = getMediaItem( {
				media: {
					items: {
						2916284: {
							42: { ID: 42, title: 'flowers' }
						}
					}
				}
			}, 2916284, 42 );

			expect( item ).to.eql( { ID: 42, title: 'flowers' } );
		} );
	} );

	describe( 'getMediaUrl()', () => {
		it( 'should return null if the item is not in state', () => {
			const url = getMediaUrl( {
				media: {
					items: {
						2916284: {}
					}
				}
			}, 2916284, 42 );

			expect( url ).to.be.null;
		} );

		it( 'should return null if the media item URL is invalid', () => {
			const url = getMediaUrl( {
				media: {
					items: {
						2916284: {
							42: { ID: 42, title: 'flowers' }
						}
					}
				}
			}, 2916284, 42 );

			expect( url ).to.be.null;
		} );

		it( 'should return a safe variation of the media URL', () => {
			const url = getMediaUrl( {
				media: {
					items: {
						2916284: {
							42: {
								ID: 42,
								title: 'flowers',
								URL: 'https://example.files.wordpress.com/2014/06/flower.gif'
							}
						}
					}
				}
			}, 2916284, 42 );

			expect( url ).to.equal( 'https://example.files.wordpress.com/2014/06/flower.gif' );
		} );
	} );
} );
