package iuh.fit.decorator;


public class ImportFeeDecorator extends ProductDecorator {
    public ImportFeeDecorator(ProductComponent product) {
        super(product);
    }

    @Override
    public String getDescription() {
        return product.getDescription() + " + Phí nhập khẩu";
    }

    @Override
    public double getPrice() {
        return product.getPrice() + 50.0;
    }
}
