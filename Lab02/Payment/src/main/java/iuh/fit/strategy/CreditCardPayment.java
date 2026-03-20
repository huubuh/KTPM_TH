package iuh.fit.strategy;

public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Đang thanh toán " + amount + " bằng Thẻ tín dụng.");
    }

    @Override
    public String getMethodName() {
        return "Thẻ tín dụng";
    }
}