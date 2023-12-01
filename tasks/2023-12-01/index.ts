export class GiftRegistry {
    childrenGifts = new Map<number, Array<string>>();

    constructor() {
        this.childrenGifts = new Map();
    }

    addGift(childId: number, gift: string) {
        if (this.childrenGifts.has(childId)) {
            const childGifts = this.childrenGifts.get(childId);
            const updatedChildGifts = [...childGifts as Array<string>, gift];
            this.childrenGifts.set(childId, updatedChildGifts);
        } else {
            this.childrenGifts.set(childId, [gift]);
        }
    }

    getGiftsForChild(childId: number) {
        return this.childrenGifts.get(childId);
    }

    removeGift(childId: number, giftToRemove: string) {
        const childGifts = this.childrenGifts.get(childId);
        if (childGifts?.includes(giftToRemove)) {
            const updatedChildGifts = childGifts.filter((currentGift: string) => currentGift !== giftToRemove);
            return this.childrenGifts.set(childId, updatedChildGifts)
        }

        throw Error('Gift not found');
    }
}