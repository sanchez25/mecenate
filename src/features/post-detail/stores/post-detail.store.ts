import { makeAutoObservable } from "mobx";

class PostDetailStore {
    commentText = "";
    isCommentInputFocused = false;

    constructor() {
        makeAutoObservable(this);
    }

    setCommentText(value: string) {
        this.commentText = value;
    }

    clearCommentText() {
        this.commentText = "";
    }

    setCommentInputFocused(value: boolean) {
        this.isCommentInputFocused = value;
    }
}

export const postDetailStore = new PostDetailStore();