package iuh.fit.decorator;

public class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(PaymentComponent payment) {
        super(payment);
    }

    @Override
    public String getDescription() {
        return payment.getDescription() + " + Mã giảm giá";
    }

    @Override
    public double getAmount() {
        return payment.getAmount() - 50.0;
    }
}