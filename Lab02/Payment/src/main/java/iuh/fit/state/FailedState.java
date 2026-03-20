package iuh.fit.state;

import iuh.fit.Payment;

public class FailedState implements PaymentState{

    @Override
    public void handle(Payment context) {
        System.out.println("Trạng thái: Thất bại");
        System.out.println("Thanh toán không thành công.");
    }
}
