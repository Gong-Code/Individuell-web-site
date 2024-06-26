import { metadata } from "@/app/layout"

jest.mock('../firebase.config.js', () => ({
    auth: {}
}));

describe('Metadata', () => {
    it('should have the correct title', () => {
        expect(metadata.title).toBe('EVENTS')
    })

    it('should have the correct description', () => {
        expect(metadata.description).toBe('Generated by create next app')
    })
})