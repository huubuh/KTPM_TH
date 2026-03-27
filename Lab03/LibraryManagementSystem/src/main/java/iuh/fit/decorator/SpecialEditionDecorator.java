package iuh.fit.decorator;

public class SpecialEditionDecorator extends BorrowDecorator {
    private String editionType;

    public SpecialEditionDecorator(BorrowComponent decoratedBorrow, String editionType) {
        super(decoratedBorrow);
        this.editionType = editionType;
    }

    @Override
    public String getBorrowDetails() {
        return decoratedBorrow.getBorrowDetails() +
                ", Phiên bản đặc biệt: " + editionType;
    }
}
