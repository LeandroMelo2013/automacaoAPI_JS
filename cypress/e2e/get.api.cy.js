/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    it('Buscar um dispositivo especifico', () => {

        const device_id = 7

        cy.buscarDeviceEspecifico(device_id)
            .as('getDeviceResult')

        //validações
        cy.get('@getDeviceResult')
            .then((response) => {
                //se for igual usar .equal
                expect(response.status).equal(200)
                expect(response.body.id).equal('7')
                expect(response.body.name).equal('Apple MacBook Pro 16')
                //usar o .empty quando não for uma STRING
                expect(response.body).not.empty
                expect(response.body.data).not.empty
                //usar .string quando for data ou valor
                expect(response.body.data.year).not.string
                expect(response.body.data.price).not.string
                //quando houver nomes com espaço usar dentro de [Conchetes]
                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data['Hard disk size']).not.empty


                

        })
    })
    

it('Buscar um dispositivo inexistente', () => {

    const device_id = 'xpto'

    cy.buscarDeviceEspecifico(device_id)
        .then((response) => {
            //se for igual usar .equal
            expect(response.status).equal(404)
            expect(response.body.error).equal(`Oject with id=${device_id} was not found.`)
        })
    })

})
