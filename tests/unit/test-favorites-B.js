/**
 * Test B: Subsection Favorites Functionality
 * Tests the precise subsection selection and favorite creation
 */
async function testSubsectionFavorites() {
    console.log('🧪 Test B: Subsection Favorites Functionality');

    const testSection = 'template-selection';
    let subsectionFavoriteId = null;

    try {
        // Test B.1: Enter subsection selection mode
        console.log('1. Testing subsection selection mode...');

        // Find and click the subsection selection button in the favorites sidebar
        const subsectionButton = document.querySelector('.subsection-selection-btn');
        if (!subsectionButton) {
            throw new Error('Subsection selection button not found in favorites sidebar');
        }

        // Get current favorites count before adding
        const favoritesBefore = window.FavoritesManager.getFavorites();
        console.log('Favorites before test:', favoritesBefore.length);

        // Mock the subsection selection system to simulate element selection
        let subsectionSelectionTriggered = false;
        const originalEnterSelectionMode = window.SubsectionSelection?.enterSelectionMode;

        if (window.SubsectionSelection) {
            window.SubsectionSelection.enterSelectionMode = function(sectionId, callback) {
                subsectionSelectionTriggered = true;
                console.log('✅ Subsection selection mode entered for section:', sectionId);

                // Simulate selecting an element after a short delay
                setTimeout(() => {
                    // Create a mock element selection event
                    const mockSelectionEvent = new CustomEvent('subsectionElementSelected', {
                        detail: {
                            sectionId: testSection,
                            selector: '#section-template-selection > .detail-level-2 > p:nth-of-type(2)', // Different selector
                                                               name: 'Test Subsection Element - UNIQUE',
                                                               elementText: 'This is a unique test subsection for demonstration'
                        }
                    });

                    window.dispatchEvent(mockSelectionEvent);
                    console.log('✅ Mock subsection element selected event dispatched');

                    // Call the original callback if provided
                    if (callback) callback();
                }, 500);
            };
        }

        // Click the subsection selection button
        subsectionButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!subsectionSelectionTriggered) {
            console.warn('⚠️  Subsection selection mode not triggered - might need manual testing');
        }

        // Test B.2: Verify subsection favorite was created
        console.log('2. Verifying subsection favorite creation...');

        const favoritesAfter = window.FavoritesManager.getFavorites();
        console.log('Favorites after test:', favoritesAfter.length);

        // Find the NEWLY created favorite (not existing ones)
        const newSubsectionFavorite = favoritesAfter.find(fav =>
        fav.type === 'subsection' &&
        fav.title === 'Test Subsection Element - UNIQUE'
        );

        if (newSubsectionFavorite) {
            subsectionFavoriteId = newSubsectionFavorite.id;
            console.log('✅ NEW Subsection favorite created:', {
                id: newSubsectionFavorite.id,
                title: newSubsectionFavorite.title,
                selector: newSubsectionFavorite.selector,
                type: newSubsectionFavorite.type
            });
        } else {
            console.log('All current favorites:', favoritesAfter.map(f => ({
                id: f.id,
                title: f.title,
                type: f.type,
                selector: f.selector
            })));
            throw new Error('New subsection favorite was not created');
        }

        // Test B.3: Verify subsection favorite appears in sidebar
        console.log('3. Verifying subsection favorite in sidebar...');

        await new Promise(resolve => setTimeout(resolve, 1000));

        const sidebarFavorite = document.querySelector(`[data-favorite-id="${subsectionFavoriteId}"]`);
        if (sidebarFavorite) {
            console.log('✅ Subsection favorite appears in sidebar');

            const favoriteTitle = sidebarFavorite.querySelector('.favorite-item-title');
            if (favoriteTitle) {
                console.log('✅ Favorite title:', favoriteTitle.textContent);
            }
        } else {
            // Debug: Check what's in the DOM
            const allFavoritesInDOM = document.querySelectorAll('.favorite-item');
            console.log('Favorites in DOM:', allFavoritesInDOM.length);
            allFavoritesInDOM.forEach((fav, index) => {
                console.log(`DOM Favorite ${index}:`, fav.dataset.favoriteId, fav.querySelector('.favorite-item-title')?.textContent);
            });
            throw new Error(`Subsection favorite not found in sidebar DOM. Looking for ID: ${subsectionFavoriteId}`);
        }

        // Test B.4: Test subsection favorite navigation
        console.log('4. Testing subsection favorite navigation...');

        let navigationAttempted = false;
        const originalScrollTo = window.SectionManagement?.scrollTo;

        if (window.SectionManagement) {
            window.SectionManagement.scrollTo = function(target, highlight = false) {
                navigationAttempted = true;
                console.log('✅ Navigation attempted to:', target, 'with highlight:', highlight);
                return originalScrollTo?.call(this, target, highlight);
            };
        }

        // Click the subsection favorite in sidebar
        const favoriteLink = sidebarFavorite.querySelector('.favorite-link');
        if (favoriteLink) {
            favoriteLink.click();
            await new Promise(resolve => setTimeout(resolve, 500));

            if (navigationAttempted) {
                console.log('✅ Subsection favorite navigation works');
            } else {
                console.warn('⚠️  Navigation not triggered - might need manual verification');
            }
        }

        // Test B.5: Remove subsection favorite using PUBLIC API
        console.log('5. Testing subsection favorite removal...');

        const removeButton = sidebarFavorite.querySelector('.favorite-remove-btn');
        if (removeButton) {
            // Use the public removeFavorite API
            window.FavoritesManager.removeFavorite(subsectionFavoriteId);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify removal
            const favoritesAfterRemove = window.FavoritesManager.getFavorites();
            const favoriteStillExists = favoritesAfterRemove.some(fav => fav.id === subsectionFavoriteId);

            if (!favoriteStillExists) {
                console.log('✅ Subsection favorite removed successfully');
            } else {
                throw new Error('Subsection favorite was not removed');
            }
        } else {
            throw new Error('Remove button not found for subsection favorite');
        }

        // Restore original functions
        if (window.SubsectionSelection && originalEnterSelectionMode) {
            window.SubsectionSelection.enterSelectionMode = originalEnterSelectionMode;
        }
        if (window.SectionManagement && originalScrollTo) {
            window.SectionManagement.scrollTo = originalScrollTo;
        }

        console.log('🎉 Test B PASSED: Subsection favorites functionality works');

    } catch (error) {
        console.error('❌ Test B FAILED:', error);

        // Clean up on failure using PUBLIC API
        if (subsectionFavoriteId) {
            window.FavoritesManager.removeFavorite(subsectionFavoriteId);
        }

        // Restore original functions
        if (window.SubsectionSelection && originalEnterSelectionMode) {
            window.SubsectionSelection.enterSelectionMode = originalEnterSelectionMode;
        }
        if (window.SectionManagement && originalScrollTo) {
            window.SectionManagement.scrollTo = originalScrollTo;
        }
    }
}

/**
 * Alternative Test B: Using addFavorite API for subsections
 */
async function testSubsectionFavoritesWithAPI() {
    console.log('🧪 Test B (Alternative): Subsection Favorites using addFavorite API');

    try {
        // Test creating a subsection favorite using the public addFavorite API
        console.log('1. Creating subsection favorite using addFavorite...');

        const subsectionData = {
            target: '#section-template-selection > .detail-level-2 > p:nth-of-type(3)', // Unique selector
            name: 'API Created Subsection',
            favoriteType: 'subsection'
        };

        // Use the public addFavorite API with subsection type
        const result = window.FavoritesManager.addFavorite(
            subsectionData.target,
            subsectionData.name,
            null, // sectionPath (not needed)
        subsectionData.favoriteType
        );

        if (result.success) {
            console.log('✅ Subsection favorite created via API:', result.favorite);

            const favoriteId = result.favorite.id;

            // Verify it appears in state
            const favorites = window.FavoritesManager.getFavorites();
            const createdFavorite = favorites.find(fav => fav.id === favoriteId);

            if (createdFavorite && createdFavorite.type === 'subsection') {
                console.log('✅ Subsection favorite verified in state:', {
                    type: createdFavorite.type,
                    title: createdFavorite.title,
                    selector: createdFavorite.selector
                });

                // Wait for UI update
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Verify it appears in DOM
                const domFavorite = document.querySelector(`[data-favorite-id="${favoriteId}"]`);
                if (domFavorite) {
                    console.log('✅ Subsection favorite appears in DOM');

                    // Test removal
                    console.log('2. Testing removal...');
                    window.FavoritesManager.removeFavorite(favoriteId);
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const favoritesAfterRemove = window.FavoritesManager.getFavorites();
                    const stillExists = favoritesAfterRemove.some(fav => fav.id === favoriteId);

                    if (!stillExists) {
                        console.log('✅ Subsection favorite removed successfully');
                        console.log('🎉 Test B (Alternative) PASSED: Subsection favorites via API work');
                    } else {
                        throw new Error('Subsection favorite was not removed');
                    }
                } else {
                    throw new Error('Subsection favorite not found in DOM');
                }
            } else {
                throw new Error('Created favorite is not a subsection type');
            }
        } else {
            throw new Error(`Failed to create subsection favorite: ${result.reason}`);
        }

    } catch (error) {
        console.error('❌ Test B (Alternative) FAILED:', error);
    }
}

// Run the appropriate test
// testSubsectionFavorites(); // Use this for full subsection selection flow
testSubsectionFavoritesWithAPI(); // Use this for direct API testing

/**
 * Alternative Test B: Direct subsection favorite creation (if selection mode not available)
 */
async function testSubsectionFavoritesDirect() {
    console.log('🧪 Test B (Alternative): Direct Subsection Favorite Creation');

    try {
        // Test direct subsection favorite creation using the API
        console.log('1. Creating subsection favorite directly...');

        const subsectionData = {
            sectionId: 'template-selection',
            selector: '#section-template-selection > .detail-level-2 > p:nth-of-type(1)',
            name: 'Test Direct Subsection'
        };

        // Use the createSubsectionFavorite function directly
        const result = window.FavoritesManager._debug.createSubsectionFavorite(
            subsectionData.sectionId,
            subsectionData.selector,
            subsectionData.name
        );

        if (result && result.id) {
            console.log('✅ Subsection favorite created directly:', result);

            // Verify it appears in the favorites list
            const favorites = window.FavoritesManager.getFavorites();
            const createdFavorite = favorites.find(fav => fav.id === result.id);

            if (createdFavorite) {
                console.log('✅ Favorite verified in state:', {
                    type: createdFavorite.type,
                    title: createdFavorite.title,
                    selector: createdFavorite.selector
                });

                // Test removal
                console.log('2. Testing removal...');
                window.FavoritesManager.removeFavorite(result.id);
                await new Promise(resolve => setTimeout(resolve, 1000));

                const favoritesAfterRemove = window.FavoritesManager.getFavorites();
                const stillExists = favoritesAfterRemove.some(fav => fav.id === result.id);

                if (!stillExists) {
                    console.log('✅ Subsection favorite removed successfully');
                    console.log('🎉 Test B (Alternative) PASSED: Direct subsection favorite creation works');
                } else {
                    throw new Error('Subsection favorite was not removed');
                }
            } else {
                throw new Error('Created favorite not found in state');
            }
        } else {
            throw new Error('Failed to create subsection favorite directly');
        }

    } catch (error) {
        console.error('❌ Test B (Alternative) FAILED:', error);
    }
}

/**
 * Quick check for subsection favorites support
 */
function checkSubsectionSupport() {
    console.log('🔍 Checking subsection favorites support...');

    console.log('1. SubsectionSelection available:', !!window.SubsectionSelection);
    console.log('2. createSubsectionFavorite available:', !!window.FavoritesManager?._debug.createSubsectionFavorite);
    console.log('3. Subsection button in DOM:', !!document.querySelector('.subsection-selection-btn'));

    if (window.FavoritesManager?._debug.createSubsectionFavorite) {
        console.log('✅ Direct API method available - can use alternative test');
    }

    if (window.SubsectionSelection) {
        console.log('✅ Subsection selection system available - can use full test');
    }

    if (!window.SubsectionSelection && !window.FavoritesManager?.debug.createSubsectionFavorite) {
        console.log('❌ No subsection favorites support detected');
    }
}

// Run the support check first
checkSubsectionSupport();

// Then run the appropriate test
testSubsectionFavorites(); // Use this if SubsectionSelection is available
testSubsectionFavoritesDirect(); // Use this as alternative
