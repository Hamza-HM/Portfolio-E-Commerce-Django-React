import React from "react";
import { Item, Label } from "semantic-ui-react";

const OrderItems = ({ orderItems }) => {
  return (
    <Item.Group relaxed>
      {orderItems.map((order_item, i) => (
        <Item key={i}>
          <Item.Image size="tiny" src={`http://localhost:8000/${order_item.item.image}`} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="a">
              {order_item.quantity} x {order_item.item.title}
            </Item.Header>
            <Item.Extra>
              <Label>${order_item.item.price}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default OrderItems;
