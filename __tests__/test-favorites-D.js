/**
 * Test D: Folder Organization and Switching
 */
async function testFolderOrganization() {
    console.log('🧪 Test D: Folder Organization and Switching');

    let testFavoriteId1 = null;
    let testFavoriteId2 = null;
    let testFolderId = null;

    try {
        // Test D.1: Verify initial folder state
        console.log('1. Verifying initial folder state...');

        const initialFolders = window.FavoritesManager.getFolders();
        const initialFavorites = window.FavoritesManager.getFavorites();

        console.log('Initial folders:', initialFolders.length);
        console.log('Initial favorites:', initialFavorites.length);
        console.log('Current folder:', window.FavoritesManager._debug?._currentFolder() || 'default');

        // Test D.2: Create test favorites in default folder
        console.log('2. Creating test favorites in default folder...');

        const result1 = window.FavoritesManager.addFavorite('[data-section="template-selection"]', 'Test Favorite 1');
        if (!result1.success) throw new Error('Failed to create test favorite 1');
        testFavoriteId1 = result1.favorite.id;
        console.log('✅ Created test favorite 1:', testFavoriteId1);

        const result2 = window.FavoritesManager.addFavorite('[data-section="artifact-filtering"]', 'Test Favorite 2');
        if (!result2.success) throw new Error('Failed to create test favorite 2');
        testFavoriteId2 = result2.favorite.id;
        console.log('✅ Created test favorite 2:', testFavoriteId2);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Test D.3: Verify favorites are in default folder
        console.log('3. Verifying favorites in default folder...');

        const favoritesInDefault = window.FavoritesManager.getFavorites().filter(fav =>
        fav.folderId === 'default'
        );
        console.log('Favorites in default folder:', favoritesInDefault.length);

        const ourFavoritesInDefault = favoritesInDefault.filter(fav =>
        fav.id === testFavoriteId1 || fav.id === testFavoriteId2
        );
        if (ourFavoritesInDefault.length === 2) {
            console.log('✅ Both test favorites are in default folder');
        } else {
            throw new Error('Test favorites not found in default folder');
        }

        // Test D.4: Test folder navigation UI
        console.log('4. Testing folder navigation UI...');

        const folderNav = document.getElementById('favorites-folder-nav');
        if (!folderNav) throw new Error('Folder navigation not found');

        const folderTabs = folderNav.querySelectorAll('.favorites-folder-tab');
        console.log('Available folder tabs:', folderTabs.length);

        // Find a custom folder to switch to (if available)
        const customFolderTab = Array.from(folderTabs).find(tab =>
        tab.dataset.folderId !== 'default' &&
        !tab.dataset.folderId.includes('add')
        );

        if (customFolderTab) {
            testFolderId = customFolderTab.dataset.folderId;
            console.log('✅ Found custom folder:', testFolderId);

            // Test D.5: Switch to custom folder
            console.log('5. Testing folder switching...');

            const folderName = customFolderTab.textContent.trim();
            customFolderTab.click();
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify folder switch
            const currentFolder = window.FavoritesManager._debug?._currentFolder();
            if (currentFolder === testFolderId) {
                console.log(`✅ Successfully switched to folder: ${folderName}`);
            } else {
                throw new Error(`Folder switch failed. Current: ${currentFolder}, Expected: ${testFolderId}`);
            }

            // Test D.6: Verify empty state for custom folder
            console.log('6. Verifying empty state for custom folder...');

            const favoritesInCustom = window.FavoritesManager.getFavorites().filter(fav =>
            fav.folderId === testFolderId
            );
            console.log('Favorites in custom folder:', favoritesInCustom.length);

            const emptyState = document.querySelector('#favorites-empty-state');
            const favoritesList = document.querySelector('#favorites-list');

            if (favoritesInCustom.length === 0) {
                if (emptyState && !emptyState.classList.contains('hidden')) {
                    console.log('✅ Empty state correctly shown for empty folder');
                } else {
                    throw new Error('Empty state not shown for empty folder');
                }
            } else {
                if (favoritesList && !favoritesList.classList.contains('hidden')) {
                    console.log('✅ Favorites list shown for folder with items');
                }
            }

            // Test D.7: Switch back to default folder
            console.log('7. Testing switch back to default folder...');

            const defaultFolderTab = folderNav.querySelector('.favorites-folder-tab[data-folder-id="default"]');
            if (!defaultFolderTab) throw new Error('Default folder tab not found');

            defaultFolderTab.click();
            await new Promise(resolve => setTimeout(resolve, 1000));

            const backToDefault = window.FavoritesManager._debug?._currentFolder();
            if (backToDefault === 'default') {
                console.log('✅ Successfully switched back to default folder');
            } else {
                throw new Error(`Failed to switch back to default. Current: ${backToDefault}`);
            }

            // Test D.8: Verify favorites reappear in default folder
            console.log('8. Verifying favorites in default folder after switch...');

            const favoritesAfterSwitch = window.FavoritesManager.getFavorites().filter(fav =>
            fav.folderId === 'default'
            );
            const ourFavoritesAfterSwitch = favoritesAfterSwitch.filter(fav =>
            fav.id === testFavoriteId1 || fav.id === testFavoriteId2
            );

            if (ourFavoritesAfterSwitch.length === 2) {
                console.log('✅ Both test favorites still in default folder after switching back');
            } else {
                throw new Error('Test favorites missing after folder switch');
            }

            if (favoritesList && !favoritesList.classList.contains('hidden')) {
                console.log('✅ Favorites list visible in default folder');
            } else {
                throw new Error('Favorites list not visible after switching back to default');
            }

        } else {
            console.log('⚠️  No custom folders available for testing - folder switching test skipped');
        }

        // Test D.9: Test folder badge counts
        console.log('9. Testing folder badge counts...');

        const defaultFolderTab = folderNav.querySelector('.favorites-folder-tab[data-folder-id="default"]');
        if (defaultFolderTab) {
            const badge = defaultFolderTab.querySelector('.favorites-folder-tab__badge');
            if (badge) {
                const badgeCount = parseInt(badge.textContent);
                const actualCount = window.FavoritesManager.getFavorites().filter(fav =>
                fav.folderId === 'default'
                ).length;

                if (badgeCount === actualCount) {
                    console.log(`✅ Default folder badge count correct: ${badgeCount}`);
                } else {
                    console.warn(`⚠️  Badge count mismatch: Badge=${badgeCount}, Actual=${actualCount}`);
                }
            } else {
                console.log('ℹ️  No badge found for default folder');
            }
        }

        console.log('🎉 Test D PASSED: Folder organization and switching works');

    } catch (error) {
        console.error('❌ Test D FAILED:', error);
    } finally {
        // Cleanup
        console.log('🧹 Cleaning up test favorites...');
        if (testFavoriteId1) window.FavoritesManager.removeFavorite(testFavoriteId1);
        if (testFavoriteId2) window.FavoritesManager.removeFavorite(testFavoriteId2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('✅ Cleanup complete');
    }
}

/**
 * Quick folder system check
 */
function checkFolderSystem() {
    console.log('🔍 Checking folder system...');

    const folders = window.FavoritesManager.getFolders();
    const favorites = window.FavoritesManager.getFavorites();

    console.log('Total folders:', folders.length);
    console.log('Total favorites:', favorites.length);

    // Count favorites per folder
    const favoritesByFolder = {};
    favorites.forEach(fav => {
        favoritesByFolder[fav.folderId] = (favoritesByFolder[fav.folderId] || 0) + 1;
    });

    console.log('Favorites by folder:', favoritesByFolder);

    // Check folder navigation in DOM
    const folderNav = document.getElementById('favorites-folder-nav');
    if (folderNav) {
        const folderTabs = folderNav.querySelectorAll('.favorites-folder-tab');
        console.log('Folder tabs in DOM:', folderTabs.length);

        folderTabs.forEach(tab => {
            console.log(`- ${tab.dataset.folderId}: "${tab.textContent.trim()}"`);
        });
    }

    // Check current folder
    const currentFolder = window.FavoritesManager._debug?._currentFolder();
    console.log('Current folder:', currentFolder);
}

// Run the folder system check first
checkFolderSystem();

// Then run the full test
setTimeout(() => testFolderOrganization(), 1000);
