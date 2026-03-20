package iuh.fit.state;

import iuh.fit.Order;

public class NewState implements OrderState{

    @Override
    public void handle(Order order) {
        System.out.println("Trạng thái : Mới Tạo");
        System.out.println("Kiểm tra thông tin đơn hàng...");
        order.setState(new ProcessingState());
        System.out.println("=> Chuyển sang trạng thái : Đang xử lý");
    }
}
