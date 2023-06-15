describe('Blog app ', function () {
  const username = 'Testi user'
  const password = '123'
  const name = 'Testi user name'

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name,
      username,
      password
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  // 5.17
  it('login form is shown', function () {
    cy.contains('log in to application').should('exist')
    cy.get('#login-form').should('contain', 'login')
  })

  // 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-btn').click()

      cy.contains(`logged in as ${username}`)
    })

    it('fails with wrong password', function () {
      cy.contains('login').click()
      cy.get('#username').type(username)
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains(`logged in as ${username}`).should('not.exist')
    })
  })

  // 5.19
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username, password })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('jokuvaan')
      cy.get('#blog-url').type('www')

      cy.contains('add blog').click()
      cy.contains('a blog created by cypress')
      cy.contains('jokuvaan')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'jokuvaan',
          url: 'www'
        })
        cy.createBlog({
          title: 'one more blog cypress',
          author: 'jokuvaan',
          url: 'www'
        })

        cy.contains('another blog cypress')
          .parent()
          .find('button')
          .as('expandButton')
        cy.get('@expandButton').click()

        cy.contains('one more blog cypress')
          .parent()
          .find('button')
          .as('expandButton')
        cy.get('@expandButton').click()
      })

      // 5.20
      it('a blog can be liked', function () {
        cy.contains('another blog cypress')
          .parent()
          .parent()
          .contains('0 likes')

        cy.contains('another blog cypress')
          .parent()
          .parent()
          .find('.like-btn')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('another blog cypress')
          .parent()
          .parent()
          .contains('1 likes')
      })

      // 5.21
      it('own blog can be removed', function () {
        cy.contains('remove')
        cy.contains('one more blog cypress')
          .parent()
          .parent()
          .find('.remove-btn')
          .as('removeButton')
        cy.get('@removeButton').click()
        cy.contains('one more blog').should('not.exist')
      })

      // 5.22
      it('remove button is visible only for user who added the blog', function () {
        cy.contains('another blog cypress').parent().parent().contains('remove')

        cy.logout({ username, password })

        const anotherUser = {
          name: 'Another user',
          username: 'AnotherUser',
          password: '456'
        }

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)
        cy.login({ username: 'AnotherUser', password: '456' })

        cy.contains('another blog cypress')
          .parent()
          .parent()
          .contains('remove')
          .should('not.exist')
      })

      // 5.23
      it('blogs are arranged by number of likes in a descending order', function () {
        cy.get('.blog-container')
          .eq(0)
          .should('contain', 'another blog cypress')
        cy.get('.blog-container')
          .eq(1)
          .should('contain', 'one more blog cypress')

        cy.contains('one more blog cypress')
          .parent()
          .parent()
          .find('.like-btn')
          .as('likeButton')
        cy.get('@likeButton').click()

        cy.get('.blog-container')
          .eq(0)
          .should('contain', 'one more blog cypress')
        cy.get('.blog-container')
          .eq(1)
          .should('contain', 'another blog cypress')

        cy.contains('another blog cypress')
          .parent()
          .parent()
          .find('.like-btn')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.get('@likeButton').click()

        cy.get('.blog-container')
          .eq(0)
          .should('contain', 'another blog cypress')
        cy.get('.blog-container')
          .eq(1)
          .should('contain', 'one more blog cypress')
      })
    })
  })
})
