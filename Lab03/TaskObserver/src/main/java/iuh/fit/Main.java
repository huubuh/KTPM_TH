package iuh.fit;

import iuh.fit.Observer.TeamMember;
import iuh.fit.subject.Task;

public class Main {
    public static void main(String[] args) {
        Task task = new Task("Thiết kế Observer Pattern", "To Do");

        TeamMember member1 = new TeamMember("An");
        TeamMember member2 = new TeamMember("Bình");
        TeamMember member3 = new TeamMember("Chi");

        task.attach(member1);
        task.attach(member2);
        task.attach(member3);

        task.setStatus("In Progress");
        System.out.println();

        task.setStatus("Code Review");
        System.out.println();

        task.detach(member2);

        task.setStatus("Done");
    }
}