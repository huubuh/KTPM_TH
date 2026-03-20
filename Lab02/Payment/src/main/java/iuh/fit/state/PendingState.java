package iuh.fit.state;

import iuh.fit.Payment;

public class PendingState implements  PaymentState{

    @Override
    public void handle(Payment context) {

        System.out.println("Trạng thái: Chờ thanh toán");
        System.out.println("Kiểm tra thông tin thanh toán...");
        context.setState(new ProcessingState());
        System.out.println("=> Chuyển sang trạng thái: Đang xử lý");
    }
}
