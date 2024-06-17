/// <reference types="cypress"/>

describe('Deletar dispositivos', () => {

    it('Deletar um dispositivo especifico', () => {

        
        const body = {
            "name": "Leandro M Melo",
            "data": {
               "year": 2024,
               "price": 999,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                   "owner": "Lele SA"
            }
         }
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
         //.as ALIAS (APELIDO)
        }).as('postDeviceResult');

         //validações
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
        
            cy.request({
                method: 'DELETE',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false
            //.as ALIAS (APELIDO)
            }).as('deleteDeviceResult')

            //validação do delete
            cy.get('@deleteDeviceResult').then((response_del) => {
                expect(response_del.status).equal(200)
                expect(response_del.body.message)
                    .equal(`Object with id = ${response_post.body.id} has been deleted.`)

            })
        })
    })
})


it('Deletar um dispositivo não existente', () => {

        const id_inexistente = 'Livia'
        cy.request({
            method: 'DELETE',
            url: `/objects/${id_inexistente}`,
            failOnStatusCode: false
        //.as ALIAS (APELIDO)
        }).as('deleteDeviceResult')

        //validação do delete
        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(404)
            expect(response_del.body.error)
                .equal(`Object with id = ${id_inexistente} doesn't exist.`)

        })
    })

    it.only('Deletar um dispositivo que não pode ser deletado', () => {

        const id_prefixo = '7'
        cy.request({
            method: 'DELETE',
            url: `/objects/${id_prefixo}`,
            failOnStatusCode: false
        //.as ALIAS (APELIDO)
        }).as('deleteDeviceResult')

        //validação do delete
        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(405)
            expect(response_del.body.error)
                .equal("7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.")

        })
    })