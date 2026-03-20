package iuh.fit.state;

import iuh.fit.Order;

public class CancelledState implements OrderState{

    @Override
    public void handle(Order order) {
        System.out.println("Trạng thái : Hủy");
        System.out.println("Đơn hàng đã bị hủy.");
    }
}
