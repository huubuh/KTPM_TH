package iuh.fit.decorator;

public abstract class BorrowDecorator implements BorrowComponent {
    protected BorrowComponent decoratedBorrow;

    public BorrowDecorator(BorrowComponent decoratedBorrow) {
        this.decoratedBorrow = decoratedBorrow;
    }

    @Override
    public String getBorrowDetails() {
        return decoratedBorrow.getBorrowDetails();
    }
}
