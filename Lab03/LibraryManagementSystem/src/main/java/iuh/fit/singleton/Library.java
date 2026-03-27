package iuh.fit.singleton;
import iuh.fit.factoty.Book;
import iuh.fit.observer.LibraryObserver;
import iuh.fit.strategy.SearchStrategy;

import java.util.ArrayList;
import java.util.List;

public class Library {
    private static Library instance;
    private List<Book> books;
    private List<LibraryObserver> subscribers;

    private Library() {
        books = new ArrayList<>();
        subscribers = new ArrayList<>();
    }

    public static Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    public void addBook(Book book) {
        books.add(book);
        System.out.println("Đã thêm sách: " + book.getDescription());
        notifyObservers("Thư viện vừa thêm sách mới: " + book.getTitle());
    }

    public void removeBook(Book book) {
        books.remove(book);
        System.out.println("Đã xóa sách: " + book.getTitle());
    }

    public void borrowBook(String bookId) {
        for (Book book : books) {
            if (book.getId().equalsIgnoreCase(bookId)) {
                if (book.isAvailable()) {
                    book.setAvailable(false);
                    System.out.println("Mượn sách thành công: " + book.getTitle());
                } else {
                    System.out.println("Sách này hiện đang được mượn.");
                }
                return;
            }
        }
        System.out.println("Không tìm thấy sách với mã: " + bookId);
    }

    public void returnBook(String bookId) {
        for (Book book : books) {
            if (book.getId().equalsIgnoreCase(bookId)) {
                book.setAvailable(true);
                System.out.println("Trả sách thành công: " + book.getTitle());
                notifyObservers("Sách \"" + book.getTitle() + "\" đã được trả.");
                return;
            }
        }
        System.out.println("Không tìm thấy sách với mã: " + bookId);
    }

    public void showBooks() {
        System.out.println("\n===== DANH SÁCH SÁCH TRONG THƯ VIỆN =====");
        if (books.isEmpty()) {
            System.out.println("Thư viện hiện chưa có sách.");
            return;
        }

        for (Book book : books) {
            System.out.println(book);
        }
    }

    public List<Book> searchBooks(SearchStrategy strategy, String keyword) {
        return strategy.search(books, keyword);
    }

    public void registerObserver(LibraryObserver observer) {
        subscribers.add(observer);
    }

    public void removeObserver(LibraryObserver observer) {
        subscribers.remove(observer);
    }

    public void notifyObservers(String message) {
        for (LibraryObserver observer : subscribers) {
            observer.update(message);
        }
    }
}
