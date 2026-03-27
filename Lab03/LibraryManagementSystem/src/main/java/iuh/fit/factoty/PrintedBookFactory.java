package iuh.fit.factoty;

public class PrintedBookFactory extends BookFactory {
    @Override
    public Book createBook(String id, String title, String author, String category) {
        return new PrintedBook(id, title, author, category, 250);
    }
}
