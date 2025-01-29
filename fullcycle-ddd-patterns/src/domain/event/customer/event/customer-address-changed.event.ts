import EventInterface from "../../@shared/event.interface";
import Address from '../../../entity/address';

type AddressChangedEvent = {
  id: string;
  name: string;
  address: Address
}

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventData: any;

  constructor(eventData: AddressChangedEvent) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}