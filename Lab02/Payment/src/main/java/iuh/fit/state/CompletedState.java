package iuh.fit.state;

import iuh.fit.Payment;

public class CompletedState implements PaymentState{
    @Override
    public void handle(Payment context) {
        System.out.println("Trạng thái: Hoàn tất");
        System.out.println("Thanh toán thành công.");
    }
}
