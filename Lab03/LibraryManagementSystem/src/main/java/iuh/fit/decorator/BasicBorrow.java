package iuh.fit.decorator;

import iuh.fit.factoty.Book;

public class BasicBorrow implements BorrowComponent {
    private Book book;
    private String borrowerName;
    private int dueDays;

    public BasicBorrow(Book book, String borrowerName, int dueDays) {
        this.book = book;
        this.borrowerName = borrowerName;
        this.dueDays = dueDays;
    }

    @Override
    public String getBorrowDetails() {
        return "Người mượn: " + borrowerName +
                ", Sách: " + book.getTitle() +
                ", Hạn mượn: " + dueDays + " ngày";
    }
}

