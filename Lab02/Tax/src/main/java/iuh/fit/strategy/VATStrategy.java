package iuh.fit.strategy;

public class VATStrategy implements  TaxStrategy{
    @Override
    public double calculateTax(double price) {
        return price * 0.1;
    }

    @Override
    public String getTaxName() {
        return "VAT 10%";
    }
}
