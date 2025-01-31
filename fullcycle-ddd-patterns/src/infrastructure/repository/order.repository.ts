import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customerId: entity.customerId,
        items: entity.items,
        total: entity.total(),
      },
      { where: { id: entity.id } }
    )
  }

  async find(id: string): Promise<Order> {
    try {
      const foundOrder = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
  
      const orderItems = foundOrder.items.map(orderItem => {
        const { id, name, price, product_id, quantity } = orderItem;
        return new OrderItem(id, name, price, product_id, quantity);
      })
  
      const order = new Order(
        foundOrder.id,
        foundOrder.customer_id,
        orderItems,
      );
  
      return order;
    } catch(error) {
      throw new Error('Fail to find the order')
    }

  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"]});

    const resultOrders = orders.map(order => {
      const orderItems = order.items.map(orderItem => {
        const { id, name, price, product_id, quantity } = orderItem;
        return new OrderItem(id, name, price, product_id, quantity);
      })

      return new Order(order.id, order.customer_id, orderItems);
    })

    return resultOrders;
  }
}