package iuh.fit.strategy;

import iuh.fit.factoty.Book;

import java.util.ArrayList;
import java.util.List;

public class SearchByCategory implements SearchStrategy {

    @Override
    public List<Book> search(List<Book> books, String keyword) {
        List<Book> result = new ArrayList<>();
        for (Book book : books) {
            if (book.getCategory().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(book);
            }
        }
        return result;
    }
}
