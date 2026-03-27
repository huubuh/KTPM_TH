package iuh.fit.composite;
public abstract class FileSystemComponent {
    protected String name;

    public FileSystemComponent(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract void showInfo(String indent);


    public void add(FileSystemComponent component) {
        throw new UnsupportedOperationException("Cannot add component to this object.");
    }

    public void remove(FileSystemComponent component) {
        throw new UnsupportedOperationException("Cannot remove component from this object.");
    }
}
