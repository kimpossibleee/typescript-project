import { v4 as uuidv4 } from 'uuid';
import Item from './items';

class User {
  private id: string;
  private name: string;
  private age: number;
  private cart: Item[];

  constructor(name: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.cart = [];
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public getCart(): Item[] {
    return this.cart;
  }

  public addToCart(item: Item): void {
    this.cart.push(item);
  }

  public removeFromCart(item: Item): void {
    this.cart = this.cart.filter((cartItem) => cartItem.getId() !== item.getId());
  }

  public removeQuantityFromCart(item: Item, quantity: number): void {
    let count = 0;
    this.cart = this.cart.filter((cartItem) => {
      if (cartItem.getId() === item.getId()) {
        count++;
        return count > quantity;
      }
      return true;
    });
  }

  public cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.getPrice(), 0);
  }

  public printCart(): void {
    console.log(`User: ${this.name}'s Cart`);
    this.cart.forEach((item) => {
      console.log(`- ${item.getName()} ($${item.getPrice()})`);
    });
  }
  public static loginUser(): User | null {
    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const ageInput = document.getElementById('age-input') as HTMLInputElement;
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);

    if (name && age) {
      return new User(name, age);
    } else {
      return null;
    }
  }

  public cartHTMLElement(): HTMLDivElement {
    const cartDiv = document.createElement('div');
    cartDiv.id = 'cart-items';

    this.cart.forEach((cartItem) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      const itemName = document.createElement('span');
      itemName.textContent = cartItem.getName();
      itemDiv.appendChild(itemName);

      const itemPrice = document.createElement('span');
      itemPrice.textContent = `Price: $${cartItem.getPrice()}`;
      itemDiv.appendChild(itemPrice);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.id = `remove-${cartItem.getId()}`;
      itemDiv.appendChild(removeButton);

      cartDiv.appendChild(itemDiv);
    });

    return cartDiv;
  }
  public addRemoveEventListeners(): void {
    this.cart.forEach((item) => {
      const removeButton = document.getElementById(`remove-${item.getId()}`);
      if (removeButton) {
        removeButton.addEventListener('click', () => {
          this.removeFromCart(item);
        });
      }
    });
  }
}
export default User;
