describe('EMI calculator suite spec', () => {
    it('ValidateEMIbarchart', () => {
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
      cy.get("#personal-loan").click()
      cy.get("#loanamountslider span[tabindex='0'].ui-slider-handle.ui-corner-all.ui-state-default")
      .focus().type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}')
      cy.get("#loaninterestslider .ui-slider-handle.ui-corner-all.ui-state-default")
      .focus().type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}')
      cy.get("#loantermslider .ui-slider-handle.ui-corner-all.ui-state-default")
      .focus().type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}')
      cy.get("#startmonthyear").click()
      cy.get("span.month:nth-child(1)").click()
      cy.get("#emibarchart .highcharts-plot-background").should('be.visible')
      cy.get("#emibarchart .highcharts-series.highcharts-series-0.highcharts-column-series.highcharts-tracker .highcharts-point")
      .siblings().should('have.length.at.least', 1)

      cy.get("g.highcharts-series.highcharts-series-0.highcharts-column-series.highcharts-tracker rect:nth-child(1)")
      .realHover();
      cy.contains("Year : 2022")
      
      })
  })
