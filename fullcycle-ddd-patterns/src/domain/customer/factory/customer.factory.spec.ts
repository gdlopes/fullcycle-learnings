import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Jhon')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Jhon')
    expect(customer.Address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const customerAddress = new Address("Street", 123, "123123-123", "City")
    const customer = CustomerFactory.createWithAddress('Jhon', customerAddress)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Jhon')
    expect(customer.Address).toBe(customerAddress)
  })
})