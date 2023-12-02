interface Gift {
    giftName: string;
}

type QueueItemGift = Gift | string;
type ChristmasQueueItem = Gift | string;

interface QueueItem {
    priority: number,
    gifts: Array<QueueItemGift>,
}

export class ChristmasQueue<ChristmasQueueItem> {
    queue = [] as Array<QueueItem>;

    enqueue(gift: QueueItemGift, priority: number) {
        const existingPriority = this.queue.find((queueItem: QueueItem) => queueItem.priority === priority);
        if (existingPriority) {
            this.queue = this.queue.map((queueItem: QueueItem) => {
                if (queueItem.priority === priority) {
                    return {
                        priority,
                        gifts: [...queueItem.gifts, gift]
                    }
                } else return queueItem;
            })
        } else {
            this.queue.push({
                priority,
                gifts: [gift]
            })
        }

        this.queue = this.sortQueueByPriority(this.queue);
    }

    sortQueueByPriority(queue: Array<QueueItem>): Array<QueueItem> {
        return queue.toSorted((a: QueueItem, b: QueueItem) => b.priority - a.priority);
    }

    dequeue(): QueueItemGift {
        if (this.isEmpty()) throw "There are no letters in the queue!"
        
        const highestPriorityGifts = this.queue[0].gifts;
        const highestPriorityGift = highestPriorityGifts.shift();
        if (!highestPriorityGift) throw "There are no letters in the queue!";

        if (highestPriorityGifts.length === 0) {
            this.queue.shift();
        }
        return highestPriorityGift;
    }

    isEmpty(): Boolean {
        return this.queue.length === 0;
    }
}