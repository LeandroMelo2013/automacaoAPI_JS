/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {

    const body_cadastro = require('../fixtures/cadastrar_device_sucesso.json')
    const body_update = require('../fixtures/update_device_sucesso.json')

    it('Alterar um dispositivo', () => {

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro
         //.as ALIAS (APELIDO)
        }).as('postDeviceResult');

         //validações
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_cadastro.name)
            expect(response_post.body.data.owner).equal(body_cadastro.data.owner)
            expect(response_post.body.createdAt).not.empty
            //expect(response_post.body.createdAt.slice(0, 10)).equal(dataAtual)
            cy.request({
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                body: body_update
            //.as ALIAS (APELIDO)
            }).as('putDeviceResult')

            //validação do put
            cy.get('@putDeviceResult').then((response_put) => {
                expect(response_put.status).equal(200)
                expect(response_put.body.name).equal(body_update.name)
                expect(response_put.body.data.owner).equal(body_update.data.owner)

            })
        })
    })
})