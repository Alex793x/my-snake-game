import LinkedList from "../LinkedList/LinkedList";
import LinkedListNode from "../LinkedList/LinkedListNode";



class Queue<T> {
    public front: LinkedListNode<T> | null;
    public rear: LinkedListNode<T> | null;
    buffer: LinkedList<T>;

    constructor() {        
        this.buffer = new LinkedList();        
        this.front = this.buffer.head;
        this.rear = this.buffer.tail;
    }

    add(item: T) {
        this.buffer.add(item);
    }

    removeFirst() {
        this.buffer.removeFirst();
        this.front = this.buffer.head;
    }

    removeLast() {
        this.buffer.removeLast();
        this.rear = this.buffer.tail;
    }

    getFirst() {
        return this.buffer.getFirst();
    }

    getLast() {
        return this.buffer.getLast();
    }

    getBuffer() {
        return this.buffer;
    }
    
    size() {
        return this.buffer.size();
    }

    isEmpty() {
        return this.buffer.isEmpty();
    }

    clear() {
        this.buffer.clear();
        this.front = this.buffer.head;
        this.rear = this.buffer.tail;
    }
    

}

export default Queue;