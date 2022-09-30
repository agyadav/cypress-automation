/// <reference types = "Cypress" />




describe('API Validation suite spec', () => {
    it('reqresApiGet', () => {
      cy.request('https://reqres.in/api/users?page=2').then((response) => {
        expect(response.status).to.eq(200)
        
       
        cy.fixture('reqresResponse').then(element => {
          for(let i=0; i< element.length;i++){
        expect(response.body.data[i]).has.property('id', element[i].id)
        expect(response.body.data[i]).has.property('email', element[i].email)
        expect(response.body.data[i]).has.property('first_name', element[i].first_name)
        expect(response.body.data[i]).has.property('last_name', element[i].last_name)
          }
        
       });
         
       
      }) 
      })
  })
  