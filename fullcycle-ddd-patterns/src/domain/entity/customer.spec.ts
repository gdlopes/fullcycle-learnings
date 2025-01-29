import Customer from './customer'
import Address from './address'
import EventDispatcher from '../event/@shared/event-dispatcher'
import EnviaConsoleLog1Handler from '../event/customer/handler/envia-console-log-1.handler'
import EnviaConsoleLog2Handler from '../event/customer/handler/envia-console-log-2.handler'
import CustomerCreatedEvent from '../event/customer/event/customer-created.event'
import EnviaConsoleLogHandler from '../event/customer/handler/envia-console-log.handler'
import CustomerAddressChangedEvent from '../event/customer/event/customer-address-changed.event'

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

  it('should dispatch event when customer is created', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    const customerCreatefEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatefEvent)

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  })

  it('should dispatch event when customer address change', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();
    const spyHandler = jest.spyOn(handler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', handler);

    const customer = new Customer('123', 'Jhon');
    const address = new Address('Rua teste', 123, '02498-123', 'São Paulo');

    const addressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address
    });
    eventDispatcher.notify(addressChangedEvent);

    expect(spyHandler).toHaveBeenCalled();
  })
})