package iuh.fit.state;

import iuh.fit.Order;

public class DeliveredState implements OrderState{
    @Override
    public void handle(Order order) {
        System.out.println("Trạng thái : Đã giao");
        System.out.println("Đơn hàng đã được giao thành công.");
    }
}
