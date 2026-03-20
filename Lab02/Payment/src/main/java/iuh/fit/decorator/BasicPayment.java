package iuh.fit.decorator;

public class BasicPayment implements PaymentComponent {
    private double amount;

    public BasicPayment(double amount) {
        this.amount = amount;
    }

    @Override
    public String getDescription() {
        return "Thanh toán";
    }

    @Override
    public double getAmount() {
        return amount;
    }
}
