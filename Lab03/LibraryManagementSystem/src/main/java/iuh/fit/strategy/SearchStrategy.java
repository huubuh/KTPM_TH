package iuh.fit.strategy;

import iuh.fit.factoty.Book;

import java.util.List;

public interface SearchStrategy {
    List<Book> search(List<Book> books, String keyword);
}
