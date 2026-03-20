package iuh.fit.strategy;

public class LuxuryTaxStrategy implements TaxStrategy{


    @Override
    public double calculateTax(double price) {
        return price * 0.25;
    }

    @Override
    public String getTaxName() {
        return "Thuê xa xỉ 25%";
    }
}
