# IndexedDB Caching Implementation

## Overview
Implement IndexedDB caching for all client-side API calls to improve performance and reduce server load. This includes caching data for homepage, about page, facilities, gallery, rooms, and membership sections.

## Completed Tasks
- [x] Created new branch `blackboxai/indexeddb-caching`
- [x] Created IndexedDB utility (`src/utils/indexedDB.js`)
- [x] Created API cache wrapper (`src/utils/apiCache.js`)
- [x] Updated all API service files to use cached versions:
  - [x] `distinctive.js` - uses `cachedFetchDistinctives`
  - [x] `offers.js` - uses `cachedFetchCuratedOffers`
  - [x] `aboutApi.js` - updated to use `cachedFetchAboutPage`
  - [x] `facilitiesApi.js` - uses `cachedFetchFacilities`
  - [x] `galleryApi.js` - uses `cachedFetchGallery`
  - [x] `roomsApi.js` - uses `cachedFetchRooms`
  - [x] `membershipApi.js` - uses `cachedFetchMembership`
- [x] Updated AboutUs page to use cached API
- [x] Created HeroBanner API component with caching

## Pending Tasks
- [ ] Test all cached API calls across different pages
- [ ] Verify cache TTL settings are appropriate
- [ ] Add cache invalidation mechanisms for admin updates
- [ ] Test offline functionality
- [ ] Add cache size monitoring and cleanup

## Cache TTL Configuration
- Homepage data: 30 minutes
- About page: 1 hour
- Facilities: 45 minutes
- Offers: 15 minutes
- Gallery: 1 hour
- Rooms: 30 minutes
- Membership: 1 hour

## Files Modified
- `src/utils/indexedDB.js` (new)
- `src/utils/apiCache.js` (new)
- `src/services/distinctive.js`
- `src/services/offers.js`
- `src/services/facilitiesApi.js`
- `src/services/galleryApi.js`
- `src/services/roomsApi.js`
- `src/services/membershipApi.js`
- `src/pages/AboutUs.jsx`
- `src/components/Home Page/Carousel/Api/HeroBanner.js` (new)

## Testing Checklist
- [ ] Homepage loads data from cache on second visit
- [ ] About page uses cached data
- [ ] Facilities page caches data
- [ ] Gallery images are cached
- [ ] Rooms data is cached
- [ ] Membership data is cached
- [ ] Cache expires after TTL
- [ ] Fallback to API when cache is empty
- [ ] Error handling when both cache and API fail
