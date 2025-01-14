import Customer from './customer'
import Address from './address'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'Gustavo')
    }).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrow('Name is required')
  })

  it('should change name successfully', () => {
    const customer = new Customer('123', 'Gustavo')
    
    customer.changeName('Jhon')

    expect(customer.name).toEqual('Jhon')
  })

  it('should throw error when set an empty name', () => {
    const customer = new Customer('123', 'Gustavo')

    expect(() => {
      customer.changeName('')
    }).toThrow('Name is required')
  })

  it('should activate customer successfully', () => {
    const customer = new Customer('123', 'Jhon')
    const address = new Address('Rua teste', 123, '02498-123', 'São Paulo')
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBeTruthy()
  })

  it('should throw error when address is undefined during customer activate', () => {
    const customer = new Customer('123', 'Jhon')

    expect(() => {
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })

  it('should deactivate customer successfully', () => {
    const customer = new Customer('123', 'Jhon')

    customer.deactivate()

    expect(customer.isActive()).toBeFalsy()
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
})