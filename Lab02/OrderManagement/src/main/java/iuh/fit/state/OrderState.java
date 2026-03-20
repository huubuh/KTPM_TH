package iuh.fit.state;

import iuh.fit.Order;

public interface OrderState {
    void handle(Order order);
}