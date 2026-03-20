package iuh.fit.decorator;

public class PackagingFeeDecorator extends  ProductDecorator{
    public PackagingFeeDecorator(ProductComponent product){
        super(product);
    }
    @Override
    public String getDescription() {
        return product.getDescription() + " + Phí đóng gói";
    }

    @Override
    public double getPrice() {
        return product.getPrice() + 20.0;
    }
}
