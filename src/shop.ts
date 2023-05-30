import Item from './items';
import User from './user'

class Shop {
  private items: Item[];

  public static myUser: User | undefined;

  constructor() {
    this.items = [];
    const item1 = new Item('Candy', 10, 'Sour Patch Kids');
    const item2 = new Item('Soda', 20, 'Sprite');
    const item3 = new Item('Ice-Cream', 30, 'Dippin Dots');
    this.items.push(item1, item2, item3);
  }


  public getItems(): Item[] {
    return this.items;
  }

  public showItems(): void {
    const shopDiv = document.getElementById('shop') as HTMLDivElement;
    this.items.forEach((item) => {
      const itemElement = item.itemElement();
      shopDiv.appendChild(itemElement);
    });
  }

  public updateCart(): void {
    const cartDiv = document.getElementById('cart') as HTMLDivElement;
    cartDiv.innerHTML = '';

    if (!Shop.myUser || Shop.myUser.getCart().length === 0) {
      cartDiv.textContent = 'Cart is empty';
    } else {
      const cartItems = Shop.myUser.cartHTMLElement();
      cartDiv.appendChild(cartItems);
      Shop.myUser.addRemoveEventListeners();
    }
  }

  public static loginUser(event: Event): void {
    event.preventDefault();
    const user = User.loginUser();
    if (user) {
      Shop.myUser = user;
      const shop = new Shop();
      shop.showItems();
      shop.updateCart();
    }
  }
}

export default Shop;
