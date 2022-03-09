describe('Blog app ', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  }) 

  it('front page can be opened', function() {
    cy.contains('log in to application')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-btn').click()

    cy.contains('logged in as root')
  })

  describe('when logged in', function() {
    beforeEach(function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-btn').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('jokuvaan')
      cy.get('#blog-url').type('www')

      cy.contains('add blog').click()
      cy.contains('a blog created by cypress')
      cy.contains('jokuvaan')
    })
  })
})