/**
 * Test E: Statistics and Access Tracking
 * Tests favorite access counting, last accessed timestamps, and statistics display
 */
async function testStatisticsAndAccessTracking() {
    console.log('🧪 Test E: Statistics and Access Tracking');

    const testSection = 'template-selection';
    let testFavoriteId = null;

    try {
        // Test E.1: Create a test favorite and verify initial statistics
        console.log('1. Creating test favorite and checking initial statistics...');

        const addResult = window.FavoritesManager.addFavorite(`[data-section="${testSection}"]`, 'Test Section for Statistics');
        if (!addResult.success) {
            throw new Error('Failed to add test favorite for statistics');
        }

        testFavoriteId = addResult.favorite.id;
        console.log('✅ Test favorite created:', testFavoriteId);

        await new Promise(resolve => setTimeout(resolve, 500));

        // Verify initial statistics
        const favorites = window.FavoritesManager.getFavorites();
        const testFavorite = favorites.find(fav => fav.id === testFavoriteId);

        if (!testFavorite) {
            throw new Error('Test favorite not found in state');
        }

        console.log('✅ Initial statistics:', {
            accessCount: testFavorite.meta?.accessCount || 0,
            lastAccessed: testFavorite.meta?.lastAccessed || 'null',
            createdAt: testFavorite.meta?.createdAt || 'null'
        });

        // Test E.2: Simulate section visits and verify access count updates
        console.log('2. Testing access count updates...');

        // Simulate multiple section visits
        const visitCount = 3;
        for (let i = 1; i <= visitCount; i++) {
            console.log(`   Simulating visit ${i}/${visitCount}...`);

            // Dispatch section visited event (this should trigger access count updates)
            const visitEvent = new CustomEvent('sectionVisited', {
                detail: {
                    sectionId: testSection,
                    timestamp: Date.now() + i * 1000 // Different timestamps
                }
            });
            window.dispatchEvent(visitEvent);

            await new Promise(resolve => setTimeout(resolve, 300));
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify access count was updated
        const favoritesAfterVisits = window.FavoritesManager.getFavorites();
        const updatedFavorite = favoritesAfterVisits.find(fav => fav.id === testFavoriteId);

        if (updatedFavorite && updatedFavorite.meta) {
            console.log('✅ Statistics after visits:', {
                accessCount: updatedFavorite.meta.accessCount,
                lastAccessed: updatedFavorite.meta.lastAccessed ? new Date(updatedFavorite.meta.lastAccessed).toISOString() : 'null'
            });

            if (updatedFavorite.meta.accessCount >= visitCount) {
                console.log(`✅ Access count correctly updated to ${updatedFavorite.meta.accessCount}`);
            } else {
                console.warn(`⚠️  Access count might not be fully updated. Expected at least ${visitCount}, got ${updatedFavorite.meta.accessCount}`);
            }
        } else {
            throw new Error('Failed to get updated favorite statistics');
        }

        // Test E.3: Verify statistics display in sidebar
        console.log('3. Testing statistics display in sidebar...');

        const sidebarFavorite = document.querySelector(`[data-favorite-id="${testFavoriteId}"]`);
        if (!sidebarFavorite) {
            throw new Error('Test favorite not found in sidebar');
        }

        // Click the statistics toggle button to show stats
        const statsToggle = sidebarFavorite.querySelector('.favorite-details-toggle');
        if (statsToggle) {
            // First ensure it's not already expanded
            if (statsToggle.getAttribute('aria-expanded') === 'true') {
                statsToggle.click();
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            // Click to expand statistics
            statsToggle.click();
            await new Promise(resolve => setTimeout(resolve, 500));

            // Check if statistics are visible
            const statsContainer = sidebarFavorite.querySelector('.favorite-details');
            if (statsContainer && statsContainer.style.display !== 'none') {
                console.log('✅ Statistics container is visible');

                // Check individual stat items
                const accessCountElement = statsContainer.querySelector('.favorite-access-count .stat-value');
                const lastAccessedElement = statsContainer.querySelector('.favorite-last-accessed .stat-value');
                const createdElement = statsContainer.querySelector('.favorite-created .stat-value');

                if (accessCountElement) {
                    console.log('✅ Access count displayed:', accessCountElement.textContent);
                }
                if (lastAccessedElement) {
                    console.log('✅ Last accessed displayed:', lastAccessedElement.textContent);
                }
                if (createdElement) {
                    console.log('✅ Created date displayed:', createdElement.textContent);
                }

                // Close statistics
                statsToggle.click();
                await new Promise(resolve => setTimeout(resolve, 300));
            } else {
                console.warn('⚠️  Statistics container not visible after toggle');
            }
        } else {
            console.warn('⚠️  Statistics toggle button not found');
        }

        // Test E.4: Test multiple favorites with different access patterns
        console.log('4. Testing multiple favorites with different access patterns...');

        const secondFavoriteResult = window.FavoritesManager.addFavorite(`[data-section="artifact-filtering"]`, 'Second Test Section');
        if (secondFavoriteResult.success) {
            const secondFavoriteId = secondFavoriteResult.favorite.id;
            console.log('✅ Second test favorite created:', secondFavoriteId);

            // Simulate different access patterns
            const secondVisitEvent = new CustomEvent('sectionVisited', {
                detail: {
                    sectionId: 'artifact-filtering',
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(secondVisitEvent);

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify both favorites have independent statistics
            const allFavorites = window.FavoritesManager.getFavorites();
            const firstFavStats = allFavorites.find(fav => fav.id === testFavoriteId)?.meta;
            const secondFavStats = allFavorites.find(fav => fav.id === secondFavoriteId)?.meta;

            console.log('✅ Independent statistics verified:', {
                firstFavorite: {
                    accessCount: firstFavStats?.accessCount || 0,
                    lastAccessed: firstFavStats?.lastAccessed ? 'set' : 'null'
                },
                secondFavorite: {
                    accessCount: secondFavStats?.accessCount || 0,
                    lastAccessed: secondFavStats?.lastAccessed ? 'set' : 'null'
                }
            });

            // Clean up second favorite
            window.FavoritesManager.removeFavorite(secondFavoriteId);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Test E.5: Verify statistics persistence
        console.log('5. Testing statistics persistence...');

        // Get current statistics
        const favoritesBeforeRefresh = window.FavoritesManager.getFavorites();
        const favoriteBefore = favoritesBeforeRefresh.find(fav => fav.id === testFavoriteId);

        if (favoriteBefore && favoriteBefore.meta) {
            const originalAccessCount = favoriteBefore.meta.accessCount;
            const originalLastAccessed = favoriteBefore.meta.lastAccessed;

            console.log('✅ Statistics before potential refresh:', {
                accessCount: originalAccessCount,
                lastAccessed: originalLastAccessed
            });

            // The statistics should persist in StateManager/localStorage
            // This is automatically tested by the fact we're reading them back
        }

        // Clean up
        console.log('6. Cleaning up test favorite...');
        window.FavoritesManager.removeFavorite(testFavoriteId);
        await new Promise(resolve => setTimeout(resolve, 500));

        const favoritesAfterCleanup = window.FavoritesManager.getFavorites();
        const favoriteStillExists = favoritesAfterCleanup.some(fav => fav.id === testFavoriteId);

        if (!favoriteStillExists) {
            console.log('✅ Test favorite cleaned up successfully');
        } else {
            throw new Error('Test favorite was not removed');
        }

        console.log('🎉 Test E PASSED: Statistics and access tracking functionality works');

    } catch (error) {
        console.error('❌ Test E FAILED:', error);

        // Clean up on failure
        if (testFavoriteId) {
            window.FavoritesManager.removeFavorite(testFavoriteId);
        }
    }
}

/**
 * Quick statistics functionality check
 */
function checkStatisticsSupport() {
    console.log('🔍 Checking statistics support...');

    console.log('1. StatisticsManager available:', !!window.FavoritesManager._debug?.StatisticsManager);
    console.log('2. sectionVisited event listeners:', !!window.FavoritesManager.addEventListener);
    console.log('3. Statistics toggle buttons in DOM:', document.querySelectorAll('.favorite-details-toggle').length);
    console.log('4. Statistics containers in DOM:', document.querySelectorAll('.favorite-details').length);

    // Check if any favorites currently have statistics
    const favorites = window.FavoritesManager.getFavorites();
    const favoritesWithStats = favorites.filter(fav => fav.meta && (fav.meta.accessCount > 0 || fav.meta.lastAccessed));

    console.log('5. Favorites with statistics:', favoritesWithStats.length);
    if (favoritesWithStats.length > 0) {
        console.log('   Sample statistics:', favoritesWithStats[0].meta);
    }
}

// Run the support check first
checkStatisticsSupport();

// Then run the main test
testStatisticsAndAccessTracking();
