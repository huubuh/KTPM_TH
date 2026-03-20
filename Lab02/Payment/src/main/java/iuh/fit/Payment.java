package iuh.fit;

import iuh.fit.decorator.PaymentComponent;
import iuh.fit.state.FailedState;
import iuh.fit.state.PaymentState;
import iuh.fit.state.PendingState;
import iuh.fit.strategy.PaymentStrategy;

public class Payment {
    private PaymentState state;
    private PaymentStrategy strategy;
    private PaymentComponent payment;

    public Payment() {
        this.state = new PendingState();
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void setPayment(PaymentComponent payment) {
        this.payment = payment;
    }

    public void processPayment() {
        state.handle(this);
    }

    public void executePayment() {
        if (strategy == null || payment == null) {
            System.out.println("Thiếu thông tin thanh toán.");
            setState(new FailedState());
            return;
        }
        strategy.pay(payment.getAmount());
    }

    public void showPaymentInfo() {
        System.out.println("Mô tả thanh toán: " + payment.getDescription());
        System.out.println("Phương thức: " + strategy.getMethodName());
        System.out.println("Tổng số tiền: " + payment.getAmount());
    }
}