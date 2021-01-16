import CardGrid from './CardGrid.js';
import cardtypes from './cardtypes.js';

export default class Grid {
  constructor(data) {
    let { scene, columns, rows } = data;
    this.xOffset = 120;
    this.yOffset = 280;
    this.yStart = scene.game.config.height / 2;
    this.columns = columns;
    this.rows = rows;
    this.scene = scene;
    this.cards = [];
    this.addCards(0);
  }

  addCards(startIndex) {
    for (let index = startIndex; index < this.columns * this.rows; index++) {
      const cardtype = cardtypes[Math.floor(Math.random() * cardtypes.length)];
      let card = new CardGrid({
        scene: this.scene,
        x: this.xOffset + (this.scene.game.config.width / 2 - this.xOffset) * (index % this.columns),
        y: this.yStart - this.yOffset * Math.floor(index / this.columns),
        card: 'card',
        image: cardtype.image,
        value: cardtype.value,
        name: cardtype.name,
        type: cardtype.type
      });
      card.depth = 0;
      this.cards.push(card);
    }
  }

  addBackRow() {
    if (this.cards.length >= this.columns * this.rows) return;
    this.addCards(6);
  }

  fadeFrontRow() {
    setTimeout(() => {
      this.cards.splice(0, 3).forEach(card => card.destroy());
      this.cards.forEach(card => {
        this.scene.tweens.add({
          targets: card,
          duration: 400,
          y: card.y + this.yOffset,
          onComplete: () => this.addBackRow()
        });
      });
    }, 1000);

    this.cards.slice(0, 3).forEach(card => {
      if (!card.selected) {
        this.scene.tweens.add({ targets: card, alpha: 0, duration: 200 });
      }
    });
  }
}
