

// describe('Blog List', () => {
//   beforeEach(() => {
//     cy.login('abc@email.com', 'Password123');
//     cy.visit('http://localhost:3000/blog-list');
//   });
// })

//   it('should display a list of blogs', () => {
//     cy.get('.card-body').should('have.length.greaterThan', 0);
//   });


//   it('should display "No blogs found" message when there are no blogs', () => {
//     cy.get('.card-body').should('have.length', 0);
//     cy.contains('No blogs found!').should('be.visible');
//   });



//   it('should navigate to the blog details page when the view icon is clicked', () => {
//     cy.get('.card-body').first().then(($blogItem) => {
//       const $eyeIcon = $blogItem.find('[data-test^="blog-view-"]');
//       const blogId = $eyeIcon.attr('data-test').split('-')[2];
//       cy.wrap($eyeIcon).click();
//       cy.url().should('include', `/blog/${blogId}`);
//       cy.get('.card-body').should('be.visible');
//     });
//   });

//   it('should delete the blog when the delete icon is clicked', () => {
//     cy.get('.card-body').first().then(($blogItem) => {
//       const $deleteIcon = $blogItem.find('[data-test^="blog-delete-"]');
//       const blogId = $deleteIcon.attr('data-test').split('-')[2];
//       cy.wrap($deleteIcon).click();
//       cy.on('window:confirm', () => true);
//       cy.get('.swal2-modal').should('be.visible');
//       cy.get('.swal2-title').should('contain', 'Are you sure?');
//       cy.get('.swal2-confirm').click();
//       cy.get('.swal2-html-container').should('contain', 'The blog has been deleted.');
//       cy.get('.swal2-confirm').click();
//       cy.get(`.card-body[key="${blogId}"]`).should('not.exist');
//       cy.get('.card-body').should('be.visible');
//     });
//   });

//   it('should display an empty state message when there are no blogs', () => {

//     // Check if the empty state message is displayed
//     cy.get('.Toastify__toast-body').should('be.visible');
//     cy.get('.Toastify__toast-body').should('contain', 'No blogs found.');

//     // Optionally, you can assert the absence of blog items
//     cy.get('.card-body').should('not.exist');
//   });
// });


describe('Blog Fetching', () => {
    beforeEach(() => {
        // Set up the local storage token
        localStorage.setItem('token', 'your-auth-token');

        // Mock the API response
        cy.intercept('GET', 'http://localhost:3001/api/v1.0/blogsite/blogs', (req) => {
            req.reply((res) => {
                res.send({
                    statusCode: 200,
                    // No need to specify body here, it will be fetched dynamically
                });
            });
        }).as('getBlogs');
    });

    it('should display a list of blogs', () => {
        cy.get('.card-body').should('have.length.greaterThan', 0);
    });
    // it('should display blogs and "Blogs fetched successfully" message when there are blogs', () => {
    //   // cy.visit('http://localhost:3000/blog-list');
    //   // // Intercept the API call to fetch dynamic blogs from the database


    //   // // Reload the page to trigger the API call
    //   // cy.reload();

    //   // // Wait for the API call to complete
    //   // cy.wait('@getBlogs').then((interception) => {
    //   //   const blogs = interception.response.body;

    //   //   // Assert that the card-body class is visible
    //   //   cy.get('.card-body', { timeout: 10000 }).should('exist');

    //   //   // Assert that the Toastify__toast-body displays the "Blogs fetched successfully" message
    //   //   cy.get('.Toastify__toast-body').should('contain.text', 'Blogs fetched successfully!');

    //   //   // Assert that the blogs are displayed correctly
    //   //   blogs.forEach((blog, index) => {
    //   //     cy.get(`.card-body`).should('contain.text', blog.name);
    //   //   });
    //   // });

    // });
});

describe('Blogs Page - No Blogs Found', () => {
    beforeEach(() => {
        // Set up the local storage token
        localStorage.setItem('token', 'your-auth-token');

        // Mock the API response
        cy.intercept('GET', 'http://localhost:3001/api/v1.0/blogsite/blogs', (req) => {
            req.reply((res) => {
                res.send({
                    statusCode: 200,
                    body: []
                });
            });
        }).as('getEmptyBlogs');
    })
    it('should display "No Blogs found" toast message when the blog list is empty', () => {
        cy.visit('http://localhost:3000/blog-list');
        cy.reload();

        // Wait for the API call to complete
        cy.wait('@getEmptyBlogs');

        // Assert that the card-body class is hidden
        cy.get('.card-body').should('not.exist');

        // Assert that the Toastify__toast-body displays the "No blogs found" message
        cy.get('.Toastify__toast-body').should('contain.text', 'No blogs found');
    })
})