package iuh.fit.factoty;

public class AudioBookFactory extends BookFactory {
    @Override
    public Book createBook(String id, String title, String author, String category) {
        return new AudioBook(id, title, author, category, 5.5);
    }
}
