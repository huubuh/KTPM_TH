package iuh.fit.strategy;

public class ConsumptionTaxStrategy implements TaxStrategy{
    @Override
    public double calculateTax(double price) {
        return price * 0.15;
    }

    @Override
    public String getTaxName() {
        return "Thuế tiêu thụ  15%";
    }
}
