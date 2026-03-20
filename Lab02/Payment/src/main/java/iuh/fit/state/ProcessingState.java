package iuh.fit.state;

import iuh.fit.Payment;

public class ProcessingState implements PaymentState{
    @Override
    public void handle(Payment context) {
        System.out.println("Trạng thái: Đang xử lý");
        context.executePayment();
        context.setState(new CompletedState());
        System.out.println("=> Chuyển sang trạng thái: Hoàn tất");
    }
    }

