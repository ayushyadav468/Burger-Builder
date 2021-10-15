const Checkout = require("./Checkout")
// @ponicode
describe("componentWillMount", () => {
    let inst

    beforeEach(() => {
        inst = new Checkout.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
