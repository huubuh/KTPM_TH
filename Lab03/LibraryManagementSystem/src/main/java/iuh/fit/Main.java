package iuh.fit;


import iuh.fit.decorator.BasicBorrow;
import iuh.fit.decorator.BorrowComponent;
import iuh.fit.decorator.ExtendedLoanDecorator;
import iuh.fit.decorator.SpecialEditionDecorator;
import iuh.fit.factoty.*;
import iuh.fit.observer.Librarian;
import iuh.fit.observer.Member;
import iuh.fit.singleton.Library;
import iuh.fit.strategy.SearchByAuthor;
import iuh.fit.strategy.SearchByCategory;
import iuh.fit.strategy.SearchByTitle;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Library library = Library.getInstance();

        System.out.println("===== HỆ THỐNG QUẢN LÝ THƯ VIỆN =====");

        // Observer
        Librarian librarian = new Librarian("Lan");
        Member member1 = new Member("Minh", "minh@gmail.com");
        Member member2 = new Member("Hà", "ha@gmail.com");

        library.registerObserver(librarian);
        library.registerObserver(member1);
        library.registerObserver(member2);

        // Factory Method
        BookFactory printedFactory = new PrintedBookFactory();
        BookFactory ebookFactory = new EBookFactory();
        BookFactory audioFactory = new AudioBookFactory();

        Book book1 = printedFactory.createBook("B01", "Lập trình Java", "Nguyễn Văn Huy", "Công nghệ");
        Book book2 = ebookFactory.createBook("B02", "Thiết kế hệ thống", "Trần Thị Lan", "Công nghệ");
        Book book3 = audioFactory.createBook("B03", "Doraemon", "Fujiko F Fujio", "Thiếu nhi");

        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);

        library.showBooks();

        // Strategy - Search by title
        System.out.println("\n===== TÌM KIẾM THEO TÊN SÁCH =====");
        List<Book> resultByTitle = library.searchBooks(new SearchByTitle(), "Java");
        for (Book book : resultByTitle) {
            System.out.println(book);
        }

        // Strategy - Search by author
        System.out.println("\n===== TÌM KIẾM THEO TÁC GIẢ =====");
        List<Book> resultByAuthor = library.searchBooks(new SearchByAuthor(), "Huy");
        for (Book book : resultByAuthor) {
            System.out.println(book);
        }

        // Strategy - Search by category
        System.out.println("\n===== TÌM KIẾM THEO THỂ LOẠI =====");
        List<Book> resultByCategory = library.searchBooks(new SearchByCategory(), "Công nghệ");
        for (Book book : resultByCategory) {
            System.out.println(book);
        }

        // Borrow and return
        System.out.println("\n===== MƯỢN / TRẢ SÁCH =====");
        library.borrowBook("B01");
        library.borrowBook("B01");
        library.returnBook("B01");

        // Decorator
        System.out.println("\n===== MƯỢN SÁCH CÓ TÍNH NĂNG MỞ RỘNG =====");
        BorrowComponent borrow = new BasicBorrow(book2, "Ngọc", 7);
        System.out.println(borrow.getBorrowDetails());

        BorrowComponent extendedBorrow = new ExtendedLoanDecorator(borrow, 3);
        System.out.println(extendedBorrow.getBorrowDetails());

        BorrowComponent specialBorrow = new SpecialEditionDecorator(extendedBorrow, "Bản dịch giới hạn");
        System.out.println(specialBorrow.getBorrowDetails());
    }
}