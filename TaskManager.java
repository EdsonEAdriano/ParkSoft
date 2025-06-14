import java.util.ArrayList;
import java.util.List;

public class TaskManager {
    private final List<Task> tasks;

    public TaskManager() {
        this.tasks = new ArrayList<>();
    }

    public void addTask(String description) {
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Descrição da tarefa não pode ser vazia.");
        }
        tasks.add(new Task(description));
    }

    public void completeTask(int index) {
        if (index < 0 || index >= tasks.size()) {
            throw new IndexOutOfBoundsException("Índice inválido.");
        }
        tasks.get(index).markAsCompleted();
    }

    public void listTasks() {
        if (tasks.isEmpty()) {
            System.out.println("Nenhuma tarefa encontrada.");
            return;
        }

        for (int i = 0; i < tasks.size(); i++) {
            System.out.printf("%d. %s%n", i + 1, tasks.get(i));
        }
    }

    public static void main(String[] args) {
        TaskManager manager = new TaskManager();
        manager.addTask("Estudar Java");
        manager.addTask("Escrever código limpo");
        manager.completeTask(0);
        manager.listTasks();
    }
}
