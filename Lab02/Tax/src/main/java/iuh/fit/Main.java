package iuh.fit;

import iuh.fit.decorator.BasicProduct;
import iuh.fit.decorator.ImportFeeDecorator;
import iuh.fit.decorator.PackagingFeeDecorator;
import iuh.fit.decorator.ProductComponent;
import iuh.fit.strategy.ConsumptionTaxStrategy;
import iuh.fit.strategy.LuxuryTaxStrategy;
import iuh.fit.strategy.VATStrategy;


public class Main {
    public static void main(String[] args) {

        System.out.println("===== SAN PHAM 1 =====");
        Tax calculator1 = new Tax();

        ProductComponent product1 = new BasicProduct("sữa milo", 100.0);
        product1 = new PackagingFeeDecorator(product1);

        calculator1.setProduct(product1);
        calculator1.setTaxStrategy(new VATStrategy());

        calculator1.showResult();
        System.out.println();
        calculator1.processTax();
        System.out.println();
        calculator1.processTax();
        System.out.println();
        calculator1.processTax();

        System.out.println("\n===== SAN PHAM 2 =====");
        Tax calculator2 = new Tax();

        ProductComponent product2 = new BasicProduct("Nước ngọt", 150.0);
        product2 = new PackagingFeeDecorator(product2);

        calculator2.setProduct(product2);
        calculator2.setTaxStrategy(new ConsumptionTaxStrategy());

        calculator2.showResult();
        System.out.println();
        calculator2.processTax();
        System.out.println();
        calculator2.processTax();
        System.out.println();
        calculator2.processTax();

        System.out.println("\n===== SAN PHAM 3 =====");
        Tax calculator3 = new Tax();

        ProductComponent product3 = new BasicProduct("rolex", 2000.0);
        product3 = new PackagingFeeDecorator(product3);
        product3 = new ImportFeeDecorator(product3);

        calculator3.setProduct(product3);
        calculator3.setTaxStrategy(new LuxuryTaxStrategy());

        calculator3.showResult();
        System.out.println();
        calculator3.processTax();
        System.out.println();
        calculator3.processTax();
        System.out.println();
        calculator3.processTax();
    }
}