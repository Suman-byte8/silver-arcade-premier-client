# TODO: Implement Force Refresh for Cached API Calls and Clear Cache on Reload

## Tasks
- [x] Modify `cachedApiCall` function in `Client/src/utils/apiCache.js` to accept a `forceRefresh` parameter
- [x] Update all specific cached API functions (e.g., `cachedFetchFacilities`, `cachedFetchRooms`, etc.) to accept and pass the `forceRefresh` parameter
- [x] Add code to clear cache on app initialization (page reload) in `Client/src/main.jsx`
- [ ] Test the updated functions to ensure cache invalidation works and fresh data is fetched from the DB
- [ ] Test that cache is cleared on page reload

## Notes
- When `forceRefresh` is true, the cache entry for the key will be deleted before making the API call
- This allows components to call APIs like `cachedFetchFacilities(true)` to bypass cache and get updated data
- Ensure backward compatibility by making `forceRefresh` optional with default false
- Cache will be cleared on every page reload to ensure fresh data from DB
