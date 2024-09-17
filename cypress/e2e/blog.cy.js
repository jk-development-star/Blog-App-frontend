describe('Blog Page', () => {
  beforeEach(() => {
    // Visit the blog page
    cy.login('abc@email.com', 'Password123');
    cy.visit('http://localhost:3000/blog-list');
  });

  it('should display "No blogs found" message when there are no blogs', () => {
    // Mock the response to return an empty array
    cy.intercept('GET', 'http://localhost:3001/api/v1.0/blogsite/blogs', {
      statusCode: 200,
      body: []
    }).as('getBlogs');

    // Reload the page to trigger the API call
    cy.reload();

    // Wait for the API call to complete
    cy.wait('@getBlogs');

    // Assert that the card-body class is hidden
    cy.get('.card-body').should('not.exist');

    // Assert that the Toastify__toast-body displays the "No blogs found" message
    cy.get('.Toastify__toast-body').should('contain.text', 'No blogs found!');
  });

  it('should display blogs and "Blogs fetched successfully" message when there are blogs', () => {
    // Mock the response to return some blogs
    cy.intercept('GET', 'http://localhost:3001/api/v1.0/blogsite/blogs', {
      statusCode: 200,
      body: [
        { _id: '1', name: 'Blog 1', category: 'Category 1', user_name: 'User 1', createdAt: '2023-09-13T00:00:00Z', article: 'Content 1' },
        { _id: '2', name: 'Blog 2', category: 'Category 2', user_name: 'User 2', createdAt: '2023-09-14T00:00:00Z', article: 'Content 2' }
      ]
    }).as('getBlogs');

    // Reload the page to trigger the API call
    cy.reload();

    // Wait for the API call to complete
    cy.wait('@getBlogs').then((interception) => {
      const blogs = interception.response.body;

      // Assert that the card-body class is visible
      cy.get('.card-body', { timeout: 10000 }).should('exist');

      // Assert that the Toastify__toast-body displays the "Blogs fetched successfully" message
      cy.get('.Toastify__toast-body').should('contain.text', 'Blogs fetched successfully!');

      // Assert that the blogs are displayed correctly
      blogs.forEach((blog, index) => {
        cy.get(`.card-body `).should('contain.text', blog.name);
      });
    });
  });
  // it('should navigate to the blog details page when the view icon is clicked', () => {
  //   cy.get('.card-body').first().then(($blogItem) => {
  //     const $eyeIcon = $blogItem.find('[data-test^="blog-view-"]');
  //     const blogId = $eyeIcon.attr('data-test').split('-')[2];
  //     cy.wrap($eyeIcon).click();
  //     cy.url().should('include', `/blog/${blogId}`);
  //     cy.get('.card-body').should('be.visible');
  //   });
  // });

  it('should navigate to the blog details page when the view icon is clicked', () => {
    cy.get('.card-body').then(($blogs) => {
      if ($blogs.length > 0) {
        cy.get('.card-body').first().then(($blogItem) => {
          const $eyeIcon = $blogItem.find('[data-test^="blog-view-"]');
          const blogId = $eyeIcon.attr('data-test').split('-')[2];
          cy.wrap($eyeIcon).click();
          cy.url().should('include', `/blog/${blogId}`);
          cy.get('.card-body').should('be.visible');
        });
      } else {
        cy.get('.card-body').should('not.exist');
        cy.log('No blogs found, skipping view test');
      }
    });
  });

  it('should delete a blog if blogs are available', () => {
    cy.get('.card-body').then(($blogs) => {
      if ($blogs.length > 0) {
        cy.get('.card-body').first().then(($blogItem) => {
          const $deleteIcon = $blogItem.find('[data-test^="blog-delete-"]');
          const blogId = $deleteIcon.attr('data-test').split('-')[2];
          cy.wrap($deleteIcon).click();
          cy.on('window:confirm', () => true);
          cy.get('.swal2-modal').should('be.visible');
          cy.get('.swal2-title').should('contain', 'Are you sure?');
          cy.get('.swal2-confirm').click();
          cy.get('.swal2-html-container').should('contain', 'The blog has been deleted.');
          cy.get('.swal2-confirm').click();
          cy.get(`.card-body[key="${blogId}"]`).should('not.exist');
          cy.get('.card-body').should('be.visible');
        });
      } else {
        cy.get('.card-body').should('not.exist');
        cy.log('No blogs found, skipping delete test');
      }
    });
  });


  // it('should navigate to the blog details page when the view icon is clicked', () => {
  //   // Click the view icon of the first blog
  //   cy.get('[data-test="blog-view-1"]').click();

  //   // Assert that the URL includes the blog ID
  //   cy.url().should('include', '/blogs/1');

  //   // Assert that the blog details page is displayed
  //   cy.get('.blog-details').should('exist');
  // });

  // it('should delete the blog when the delete icon is clicked', () => {
  //   // Mock the delete API response
  //   cy.intercept('DELETE', 'http://localhost:3001/api/v1.0/blogsite/blogs/', {
  //     statusCode: 200,
  //     body: { message: 'Blog deleted successfully' }
  //   }).as('deleteBlog');

  //   // Click the delete icon of the first blog
  //   cy.get('[data-test="blog-delete-1"]').click();

  //   // Confirm the deletion in the SweetAlert2 popup
  //   cy.get('.swal2-confirm').click();

  //   // Wait for the delete API call to complete
  //   cy.wait('@deleteBlog');

  //   // Assert that the blog is removed from the list
  //   cy.get('.card-body .blog-card').should('have.length', 1);

  //   // Assert that the Toastify__toast-body displays the "Blog deleted successfully" message
  //   cy.get('.Toastify__toast-body').should('contain.text', 'Blog deleted successfully');
  // });

  // it('should navigate to the blog details page when the view icon is clicked', () => {
  //   cy.get('.card-body').first().then(($blogItem) => {
  //     const $eyeIcon = $blogItem.find('[data-test^="blog-view-"]');
  //     const blogId = $eyeIcon.attr('data-test').split('-')[2];
  //     cy.wrap($eyeIcon).click();
  //     cy.url().should('include', `/blog/${blogId}`);
  //     cy.get('.card-body').should('be.visible');
  //   });
  // });

  // it('should delete the blog when the delete icon is clicked', () => {
  //   cy.get('.card-body').first().then(($blogItem) => {
  //     const $deleteIcon = $blogItem.find('[data-test^="blog-delete-"]');
  //     const blogId = $deleteIcon.attr('data-test').split('-')[2];
  //     cy.wrap($deleteIcon).click();
  //     cy.on('window:confirm', () => true);
  //     cy.get('.swal2-modal').should('be.visible');
  //     cy.get('.swal2-title').should('contain', 'Are you sure?');
  //     cy.get('.swal2-confirm').click();
  //     cy.get('.swal2-html-container').should('contain', 'The blog has been deleted.');
  //     cy.get('.swal2-confirm').click();
  //     cy.get(`.card-body[key="${blogId}"]`).should('not.exist');
  //     cy.get('.card-body').should('be.visible');
  //   });
  // });

  // it('should delete the blog when the delete icon is clicked', () => {
  //   cy.get('.card-body').first().then(($blogItem) => {
  //     const $deleteIcon = $blogItem.find('[data-test^="blog-delete-"]');
  //     const blogId = $deleteIcon.attr('data-test').split('-')[2];
  //     cy.wrap($deleteIcon).click();
  //     cy.get('.swal2-modal').should('be.visible');
  //     cy.get('.swal2-title').should('contain', 'Are you sure?');
  //     cy.get('.swal2-confirm').click();
  //     cy.intercept('DELETE', `http://localhost:3001/api/v1.0/blogsite/blogs/${blogId}`, {
  //       statusCode: 200,
  //       body: {},
  //     }).as('deleteBlog');
  //     cy.wait('@deleteBlog').its('response.statusCode').should('eq', 200);
  //     cy.get('.swal2-html-container').should('contain', 'The blog has been deleted.');
  //     cy.get('.swal2-confirm').click();
  //     cy.get(`.card-body[data-key="${blogId}"]`).should('not.exist');
  //     cy.get('.card-body').should('be.visible');
  //   });
  // });


});