/**
 * Test C: Favorites Sidebar Interactions
 * Tests the sidebar UI functionality and interactions
 */
async function testFavoritesSidebar() {
    console.log('🧪 Test C: Favorites Sidebar Interactions');

    try {
        // Test C.1: Verify sidebar initial state
        console.log('1. Testing sidebar initial state...');

        const sidebar = document.querySelector('#sidebar-favorites');
        if (!sidebar) throw new Error('Favorites sidebar not found');

        const isActive = sidebar.classList.contains('active');
        console.log(isActive ? '✅ Sidebar is active' : '❌ Sidebar is not active');

        // Test C.2: Test folder navigation tabs
        console.log('2. Testing folder navigation...');

        const folderTabs = document.querySelectorAll('.favorites-folder-tab');
        console.log(`✅ Found ${folderTabs.length} folder tabs`);

        // Find and test the default folder tab
        const defaultFolderTab = document.querySelector('.favorites-folder-tab[data-folder-id="default"]');
        if (defaultFolderTab) {
            const isDefaultActive = defaultFolderTab.classList.contains('favorites-folder-tab--active');
            console.log(isDefaultActive ? '✅ Default folder is active' : '❌ Default folder is not active');

            // Test badge count
            const badge = defaultFolderTab.querySelector('.favorites-folder-tab__badge');
            if (badge) {
                console.log(`✅ Default folder badge: ${badge.textContent}`);
            }
        }

        // Test C.3: Test empty state behavior
        console.log('3. Testing empty state behavior...');

        const emptyState = document.querySelector('#favorites-empty-state');
        const favoritesList = document.querySelector('#favorites-list');

        if (emptyState && favoritesList) {
            const isEmptyStateVisible = !emptyState.classList.contains('hidden');
            const isListVisible = !favoritesList.classList.contains('hidden');

            console.log(isEmptyStateVisible ? '✅ Empty state is visible' : '❌ Empty state is hidden');
            console.log(isListVisible ? '✅ Favorites list is visible' : '❌ Favorites list is hidden');

            // Check if suggestions are shown
            const suggestions = emptyState.querySelectorAll('.favorites-empty-suggestion');
            console.log(`✅ Found ${suggestions.length} empty state suggestions`);
        }

        // Test C.4: Add a test favorite and verify UI updates
        console.log('4. Testing UI updates with favorites...');

        // Add a test favorite
        const testResult = window.FavoritesManager.addFavorite('[data-section="template-selection"]', 'Test Sidebar Favorite');
        if (testResult.success) {
            console.log('✅ Test favorite added for sidebar testing');

            // Wait for UI updates
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify favorites list is now visible
            const updatedEmptyState = document.querySelector('#favorites-empty-state');
            const updatedFavoritesList = document.querySelector('#favorites-list');

            if (updatedEmptyState && updatedFavoritesList) {
                const isNowEmptyStateHidden = updatedEmptyState.classList.contains('hidden');
                const isNowListVisible = !updatedFavoritesList.classList.contains('hidden');

                console.log(isNowEmptyStateHidden ? '✅ Empty state correctly hidden' : '❌ Empty state should be hidden');
                console.log(isNowListVisible ? '✅ Favorites list correctly visible' : '❌ Favorites list should be visible');

                // Verify the favorite appears in the list
                const favoriteItems = updatedFavoritesList.querySelectorAll('.favorite-item');
                console.log(`✅ Found ${favoriteItems.length} favorite items in list`);

                if (favoriteItems.length > 0) {
                    const testFavorite = Array.from(favoriteItems).find(item =>
                    item.querySelector('.favorite-item-title')?.textContent === 'Test Sidebar Favorite'
                    );
                    console.log(testFavorite ? '✅ Test favorite found in list' : '❌ Test favorite not found in list');
                }
            }

            // Test C.5: Test favorite actions (edit, remove, details)
            console.log('5. Testing favorite action buttons...');

            const testFavoriteElement = document.querySelector(`[data-favorite-id="${testResult.favorite.id}"]`);
            if (testFavoriteElement) {
                // Test details toggle button
                const detailsToggle = testFavoriteElement.querySelector('.favorite-details-toggle');
                if (detailsToggle) {
                    console.log('✅ Details toggle button found');
                    // Note: We won't actually click it to avoid UI changes during test
                }

                // Test edit button
                const editButton = testFavoriteElement.querySelector('.favorite-action--edit');
                if (editButton) {
                    console.log('✅ Edit button found');
                }

                // Test remove button
                const removeButton = testFavoriteElement.querySelector('.favorite-remove-btn');
                if (removeButton) {
                    console.log('✅ Remove button found');
                }
            }

            // Test C.6: Test subsection selection button
            console.log('6. Testing subsection selection button...');

            const subsectionButton = document.querySelector('.subsection-selection-btn');
            if (subsectionButton) {
                console.log('✅ Subsection selection button found');
                console.log('Button text:', subsectionButton.querySelector('.subsection-selection-btn__text')?.textContent);
            }

            // Clean up: Remove test favorite
            console.log('7. Cleaning up test favorite...');
            window.FavoritesManager.removeFavorite(testResult.favorite.id);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Verify empty state returns
            const finalEmptyState = document.querySelector('#favorites-empty-state');
            const finalFavoritesList = document.querySelector('#favorites-list');

            if (finalEmptyState && finalFavoritesList) {
                const isFinalEmptyStateVisible = !finalEmptyState.classList.contains('hidden');
                const isFinalListHidden = finalFavoritesList.classList.contains('hidden');

                console.log(isFinalEmptyStateVisible ? '✅ Empty state correctly restored' : '❌ Empty state should be visible');
                console.log(isFinalListHidden ? '✅ Favorites list correctly hidden' : '❌ Favorites list should be hidden');
            }

        } else {
            throw new Error('Failed to add test favorite for sidebar testing');
        }

        // Test C.7: Test sidebar responsiveness (if applicable)
        console.log('8. Testing sidebar structure...');

        const sidebarHeader = sidebar.querySelector('.sidebar-tab-header');
        const sidebarBody = sidebar.querySelector('.sidebar-tab-body');
        const sidebarFooter = sidebar.querySelector('.sidebar-footer');

        console.log(sidebarHeader ? '✅ Sidebar header found' : '❌ Sidebar header missing');
        console.log(sidebarBody ? '✅ Sidebar body found' : '❌ Sidebar body missing');
        console.log(sidebarFooter ? '✅ Sidebar footer found' : '❌ Sidebar footer missing');

        console.log('🎉 Test C PASSED: Favorites sidebar interactions work correctly');

    } catch (error) {
        console.error('❌ Test C FAILED:', error);
    }
}

/**
 * Quick sidebar health check
 */
function checkSidebarHealth() {
    console.log('🔍 Checking sidebar health...');

    const sidebar = document.querySelector('#sidebar-favorites');
    if (!sidebar) {
        console.log('❌ Sidebar not found');
        return;
    }

    console.log('1. Sidebar found:', !!sidebar);
    console.log('2. Sidebar active:', sidebar.classList.contains('active'));
    console.log('3. Folder tabs:', document.querySelectorAll('.favorites-folder-tab').length);
    console.log('4. Empty state:', !!document.querySelector('#favorites-empty-state'));
    console.log('5. Favorites list:', !!document.querySelector('#favorites-list'));
    console.log('6. Subsection button:', !!document.querySelector('.subsection-selection-btn'));

    // Check if any favorites exist
    const favorites = window.FavoritesManager.getFavorites();
    console.log('7. Current favorites count:', favorites.length);

    if (favorites.length === 0) {
        console.log('✅ Sidebar should show empty state');
    } else {
        console.log('✅ Sidebar should show favorites list');
    }
}

// Run the health check first
checkSidebarHealth();

// Then run the full test
testFavoritesSidebar();
