package iuh.fit.state;

import iuh.fit.Order;

public class ProcessingState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Trạng thái : Đang xử lý");
        System.out.println("Đơn hàng đang đưuọc đóng gói");
        System.out.println("Đơn hàng đang được vận chuyển...");
        order.shipOrder();
        order.setState(new DeliveredState());
        System.out.println("=> Chuyển sang trạng thái : Đã giao");
    }
}
