describe('EMI calculator suite spec', () => {
  it('ValidateEMIpiechart', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })

    var p=2500000
    var i=10
    var r=i/12/100
    var t=10
    var n=t*12
    var eExpected =p*r* Math.pow(1+r,n)/(Math.pow(1+r,n) - 1)
    var totalInterestPayableExpected=eExpected*n - p
    var totalPaymentExpected=eExpected*n
    var eExpectedStr = Math.round(eExpected).toLocaleString('en-IN')
    var totalInterestPayableExpectedStr = Math.round(totalInterestPayableExpected).toLocaleString('en-IN')
    var totalPaymentExpectedStr = Math.round(totalPaymentExpected).toLocaleString('en-IN')
    var totalInterestPer = (100 * totalInterestPayableExpected/totalPaymentExpected).toFixed(1)
    var principalLoadAmtPer = (100 - totalInterestPer).toFixed(1)

    
    

    cy.visit('https://emicalculator.net/')
    cy.title().should('eq', 'EMI Calculator for Home Loan, Car Loan & Personal Loan in India')
    cy.get("#loanamount").clear().type(p)
    cy.get("#loaninterest").clear().type(i)
    cy.get("#loanterm").clear().type(t)
    cy.get("#emiamount span").click()
    cy.get("#emiamount span").should('contain', eExpectedStr)
    cy.get("#emitotalinterest span").contains(totalInterestPayableExpectedStr)
    cy.get("#emitotalamount span").contains(totalPaymentExpectedStr)
    cy.wait(5000)
    cy.get(".highcharts-point.highcharts-color-0").should('be.visible')
    cy.get(".highcharts-label.highcharts-data-label.highcharts-data-label-color-1 text>tspan").contains(totalInterestPer + "%")
    cy.get(".highcharts-label.highcharts-data-label.highcharts-data-label-color-0 text>tspan").contains(principalLoadAmtPer + "%")
    
    })
  })
