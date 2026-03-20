package iuh.fit.decorator;

public class ProcessingFeeDecorator extends PaymentDecorator{

    public ProcessingFeeDecorator(PaymentComponent payment) {
        super(payment);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Phí xử lý";
    }
    @Override
    public double getAmount() {
        return super.getAmount() + 20.0;
    }
}
