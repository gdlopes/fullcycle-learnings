import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(_event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}