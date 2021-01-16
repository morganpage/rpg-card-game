import CardBase from '../js/CardBase.js';

export default class CardDraggable extends CardBase {
  constructor(data) {
    let { ondragend } = data;
    super(data);
    this.originalX = this.x;
    this.originalY = this.y;
    this.draggable = true;
    this.dragging = false;
    this.ondragend = ondragend;
    this.setSize(this.spriteCard.width, this.spriteCard.height);
    this.setInteractive();
    this.scene.input.setDraggable(this);
    this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      if (!this.draggable) return;
      this.dragging = true;
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.scene.input.on('dragend', (pointer, gameObject) => {
      this.dragging = false;
      gameObject.ondragend(pointer, gameObject);
    });
  }
}
