/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Checks RSS feeds */
    describe('RSS Feeds', function() {

        /* Checks if the variable allFeeds is defined and it is not empty */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Checks if the feeds have correct URLs */

        it('have a URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });

        /* Checks if the feeds have correct names */
        
        it('have a name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });
    });


    /* Checks if the menu is working correctly */
    describe('The menu', function() {

        /* Checks if the menu is hidden by default */

        it('is hidden by default', function() {
            // the menu is hidden so it should have the menu-hidden class
            expect(document.body.classList).toContain("menu-hidden");
        });

        /* Checks if the menu is shown/hidden when the icon is clicked */

        it('changes visibility when the menu icon is clicked', function() {
            let menu = document.querySelector(".menu-icon-link");
            // the menu is hidden so it should have the menu-hidden class
            menu.click(); 
            // when we click on it, the class should have been removed and the menu is shown
            expect(document.body.classList).not.toContain("menu-hidden");
            // when we click again on it, the class should appear again
            menu.click(); 
            expect(document.body.classList).toContain("menu-hidden");
        });

    });


    /* Checks the initial entries */
    describe('Initial Entries', function() {

        /* Checks that a feed is loading at least one entry correctly */

        let firstEntry;

        beforeEach(function(done){
            // we load a feed and search for the first entry element
            loadFeed(0,function(){
                firstEntry = document.querySelector(".feed .entry");
                done();
            });
        });

        it('loads at least one entry from feed', function(done) {
            // the first entry exists and it has content
            expect(firstEntry.innerHTML.length).toBeGreaterThan(0);
            expect(firstEntry).toBeDefined();
            expect(firstEntry).not.toBeNull();
            done();
        });

    });

    /* Checks new feeds selection */
    describe('New Feed Selection', function() {

        /* Checks that the content changes when we load a new feed */

        let firstFeedEntry;
        let secondFeedEntry;

        beforeEach(function(done){
            loadFeed(0,function(){
                // we load the first feed and we save its first entry
                firstFeedEntry = document.querySelector(".feed .entry").innerHTML;
                loadFeed(1,function(){
                    // we load the second feed and we save its first entry
                    secondFeedEntry = document.querySelector(".feed .entry").innerHTML;
                    done();
                });
            });
        });

        it('changes content with a new feed', function() {
            // the first feed entry should be different from the second feed entry
            expect(firstFeedEntry).not.toBe(secondFeedEntry);
        });

    })
}());
