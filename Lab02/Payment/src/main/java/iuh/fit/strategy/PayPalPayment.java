package iuh.fit.strategy;

public class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Đang thanh toán " + amount + " bằng PayPal.");
    }

    @Override
    public String getMethodName() {
        return "PayPal";
    }
}