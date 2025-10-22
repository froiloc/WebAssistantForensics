// Fixed Test A.1
async function testBasicFavoriteFunctionality() {
    console.log('🧪 Test A.1: Basic favorite functionality');

    const testSection = 'template-selection';
    const testTarget = `[data-section="${testSection}"]`;

    try {
        // 1. Add favorite via section header star
        console.log('1. Adding favorite via section header star...');
        const navStar = document.querySelector(`.nav-item-star[data-section-id="${testSection}"]`);
        if (!navStar) throw new Error('Navigation star not found');

        navStar.click();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify favorite was added - FIXED: check by target, not sectionId
        const favorites = window.FavoritesManager.getFavorites();
        const wasAdded = favorites.some(fav => fav.target === testTarget);
        console.log(wasAdded ? '✅ Favorite added successfully' : '❌ Favorite not added');

        if (!wasAdded) {
            console.log('Available favorites:', favorites.map(f => ({ target: f.target, sectionId: f.sectionId })));
        }

        // 2. Remove favorite via section header star
        console.log('2. Removing favorite via section header star...');
        navStar.click();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify favorite was removed - FIXED: check by target
        const favoritesAfterRemove = window.FavoritesManager.getFavorites();
        const wasRemoved = !favoritesAfterRemove.some(fav => fav.target === testTarget);
        console.log(wasRemoved ? '✅ Favorite removed successfully' : '❌ Favorite not removed');

        if (!wasRemoved) {
            console.log('Remaining favorites:', favoritesAfterRemove.map(f => ({ target: f.target, sectionId: f.sectionId })));
        }

        // Only pass if both add and remove worked
        if (wasAdded && wasRemoved) {
            console.log('🎉 Test A.1 PASSED: Basic favorite functionality works');
        } else {
            throw new Error('Favorite add/remove verification failed');
        }

    } catch (error) {
        console.error('❌ Test A.1 FAILED:', error);
    }
}



// Robust Test A.2 that handles existing favorites
async function testMultipleFavoritesRobust() {
    console.log('🧪 Test A.2: Multiple favorites management (Robust)');

    const testSections = ['template-selection', 'artifact-filtering'];
    const testTargets = testSections.map(section => `[data-section="${section}"]`);
    const addedFavoriteIds = [];

    try {
        // Clean up any existing test favorites first
        console.log('0. Cleaning up existing test favorites...');
        const favoritesBefore = window.FavoritesManager.getFavorites();
        for (const target of testTargets) {
            const existing = favoritesBefore.find(fav => fav.target === target);
            if (existing) {
                window.FavoritesManager.removeFavorite(existing.id);
                console.log(`🧹 Removed existing: ${target}`);
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Add multiple favorites
        console.log('1. Adding multiple favorites...');
        for (const section of testSections) {
            const target = `[data-section="${section}"]`;
            const result = window.FavoritesManager.addFavorite(target);

            if (result.success) {
                addedFavoriteIds.push(result.favorite.id);
                console.log(`✅ Added favorite: ${section} (ID: ${result.favorite.id})`);
            } else if (result.reason === 'duplicate') {
                console.log(`ℹ️  Favorite already exists for: ${section}, using existing`);
                // Use the existing favorite
                const existing = window.FavoritesManager.getFavorites().find(fav => fav.target === target);
                if (existing) {
                    addedFavoriteIds.push(existing.id);
                }
            } else {
                throw new Error(`Failed to add favorite for ${section}: ${result.reason}`);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify all were added
        const favorites = window.FavoritesManager.getFavorites();
        const allAdded = testTargets.every(target =>
        favorites.some(fav => fav.target === target)
        );

        console.log(allAdded ? '✅ All favorites added' : '❌ Not all favorites added');

        if (!allAdded) {
            console.log('Expected targets:', testTargets);
            console.log('Actual favorites:', favorites.map(f => f.target));
        }

        // Remove all test favorites
        console.log('2. Removing all test favorites...');
        for (const favoriteId of addedFavoriteIds) {
            if (favoriteId) {
                window.FavoritesManager.removeFavorite(favoriteId);
                console.log(`✅ Removed favorite: ${favoriteId}`);
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify all were removed
        const favoritesAfterRemove = window.FavoritesManager.getFavorites();
        const allRemoved = testTargets.every(target =>
        !favoritesAfterRemove.some(fav => fav.target === target)
        );

        if (allAdded && allRemoved) {
            console.log('🎉 Test A.2 PASSED: Multiple favorites management works');
        } else {
            throw new Error('Multiple favorites verification failed');
        }

    } catch (error) {
        console.error('❌ Test A.2 FAILED:', error);
    }
}

// Cleanup function to remove test favorites
async function cleanupTestFavorites() {
    console.log('🧹 Cleaning up test favorites...');

    const testTargets = [
        '[data-section="template-selection"]',
        '[data-section="artifact-filtering"]'
    ];

    const favorites = window.FavoritesManager.getFavorites();
    let removedCount = 0;

    for (const target of testTargets) {
        const favorite = favorites.find(fav => fav.target === target);
        if (favorite) {
            window.FavoritesManager.removeFavorite(favorite.id);
            removedCount++;
            console.log(`✅ Removed: ${target}`);
            await new Promise(resolve => setTimeout(resolve, 300)); // Small delay between removals
        }
    }

    console.log(`🧹 Cleanup complete: Removed ${removedCount} test favorites`);
    return removedCount;
}

// Run cleanup then test
async function runTestAWithCleanup() {
    await cleanupTestFavorites();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for cleanup to complete
    await testBasicFavoriteFunctionality();
    await testMultipleFavoritesRobust();
}

// Run the test with cleanup
runTestAWithCleanup();
