/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        const body = 

        cy.cadastrarDevice(payload_cadastro_device).as('postDeviceResult')
        
         //validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)
            expect(response.body.name).equal("Leandro M Melo")
             //usar .string quando for data ou valor
            expect(response.body.data.year).not.string
            expect(response.body.data.price).not.string
             //quando houver nomes com espaço usar dentro de [Conchetes]
            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['Hard disk size']).not.empty
            //inserir o console para verificar quando inspecionar
            //slice quando precisa quebrar um dado inicio tal
            
            
        })

                

    })
})

it('Cadastrar um dispositivo sem mandar dados', () => {

    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: ''
     //.as ALIAS (APELIDO)
    }).as('postDeviceResult')

    //validações
    cy.get('@postDeviceResult').then((response) => {
        expect(response.status).equal(400)
        expect(response.body.error).equal("400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.")
        
        
        
    })

            

})