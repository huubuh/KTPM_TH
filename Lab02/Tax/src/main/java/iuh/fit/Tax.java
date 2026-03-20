package iuh.fit;

import iuh.fit.decorator.ProductComponent;
import iuh.fit.state.PendingState;
import iuh.fit.state.TaxState;
import iuh.fit.strategy.TaxStrategy;

public class Tax {
    private TaxState state;
    private TaxStrategy taxStrategy;
    private ProductComponent product;

    public Tax() {
        this.state = new PendingState();
    }

    public void setState(TaxState state) {
        this.state = state;
    }

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public void setProduct(ProductComponent product) {
        this.product = product;
    }

    public void processTax() {
        state.handle(this);
    }

    public double calculateFinalAmount() {
        double productPrice = product.getPrice();
        double tax = taxStrategy.calculateTax(productPrice);
        return productPrice + tax;
    }

    public void showResult() {
        double productPrice = product.getPrice();
        double tax = taxStrategy.calculateTax(productPrice);
        double finalAmount = productPrice + tax;

        System.out.println("San pham: " + product.getDescription());
        System.out.println("Gia sau phu phi: " + productPrice);
        System.out.println("Loai thue: " + taxStrategy.getTaxName());
        System.out.println("Tien thue: " + tax);
        System.out.println("Tong thanh toan: " + finalAmount);
    }
}