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
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* A test that loops through each feed
         * in the allFeeds object, ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
           for(let feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
           }
        });
    });

    /* A new test suite named "The menu" */
        describe('The menu', function(){
          const body = document.querySelector('body'); // queries body element
          const menu = document.querySelector('.menu-icon-click'); // queries menu-icon-click


        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden', function() {
             $('body').hasClass('menu-hidden'); // see: https://api.jquery.com/hasclass/
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('displays when clicked and hides when clicked', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    /* A test suite named "Initial Entries" */
    describe('Intial entries', function(){
      const body = document.querySelector('body'); // queries body element
      const menu = document.querySelector('.menu-icon-click'); // queries menu-icon-click
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0, done); // lets Jasmine know our beforeEach function has finished
         });
         it('completes work', function() {
           const feed = document.querySelectorAll('.feed .entry'); // looks for entry child of feed element
           expect(feed.length > 0).toBe(true); // .children selector searches through the children of feed element
       });
});
    /* A new test suite named "New Feed Selection", which ensures that
     * when a new feed is loaded by the loadFeed function, the content has changed.
     */
    describe('New feed selection', function(){
      const feed = document.querySelector('.feed'); // queries feed element
      let firstFeed, nextFeed; // variables to define changing content

         beforeEach(function(done) {
           loadFeed(0, function() { // feed 0 is loaded
             firstFeed = $('.feed').html(); // populates the first feed here
             loadFeed(1, function() { // feed 1 is loaded
               nextFeed = $('.feed').html(); // populates the next feed here
               done();
            });
          });
        });
         it('content changes', function() {
           expect(nextFeed).not.toEqual(firstFeed); // if nextFeed is not equal to firstFeed, the content has changed
           });
       });
}());
