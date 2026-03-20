package iuh.fit.decorator;

public class BasicProduct implements ProductComponent{
    private String name;
    private double basePrice;

    public BasicProduct(String name, double basePrice) {
        this.name = name;
        this.basePrice = basePrice;
    }

    @Override
    public String getDescription() {
        return name;
    }

    @Override
    public double getPrice() {
        return basePrice;
    }
}
