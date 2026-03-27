package iuh.fit.factoty;
public class AudioBook extends Book {
    private double duration;

    public AudioBook(String id, String title, String author, String category, double duration) {
        super(id, title, author, category);
        this.duration = duration;
    }

    @Override
    public String getDescription() {
        return "Sách nói - " + title + " (Thời lượng: " + duration + " giờ)";
    }
}