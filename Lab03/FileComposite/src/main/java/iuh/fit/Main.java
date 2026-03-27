package iuh.fit;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.

import iuh.fit.composite.FileItem;
import iuh.fit.composite.FileSystemComponent;
import iuh.fit.composite.Folder;

public class Main {
    public static void main(String[] args) {
        // Tạo file
        FileSystemComponent file1 = new FileItem("report.docx", 1.2);
        FileSystemComponent file2 = new FileItem("photo.jpg", 2.5);
        FileSystemComponent file3 = new FileItem("music.mp3", 5.8);
        FileSystemComponent file4 = new FileItem("notes.txt", 0.4);

        // Tạo folder con
        Folder documents = new Folder("Documents");
        Folder pictures = new Folder("Pictures");
        Folder media = new Folder("Media");

        // Thêm file vào folder con
        documents.add(file1);
        documents.add(file4);

        pictures.add(file2);

        media.add(file3);
        media.add(pictures);

        // Tạo folder gốc
        Folder root = new Folder("Root");

        // Thêm các thành phần vào root
        root.add(documents);
        root.add(media);

        // Hiển thị toàn bộ cây thư mục
        root.showInfo("");
    }
}