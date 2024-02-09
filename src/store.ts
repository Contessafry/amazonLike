import { Cart, Category, Order, Product, Tables, User } from './declarations';
import { v4 as uuidv4 } from 'uuid';
export class AmazonApp {
  name = 'Amazon App';
  //#region Properties
  //TABLES
  #userlogged: Omit<User, 'password'> | null = null;
  #users: Tables<User> = {};
  #products: Tables<Product> = {};

  #carts: Tables<Cart> = {};
  #orders: Tables<Order> = {};
  #categories: Tables<Category> = {};
  //RELATIONS
  #productSeller: Tables<User['id']> = {};
  #productCategorys: Tables<Category['id']> = {};
  #userOrders: Tables<Array<Order['id']>> = {};
  #userProducts: Tables<Array<Product['id']>> = {};
  #userCarts: Tables<Cart['id']> = {};
  #cartUser: Tables<User['id']> = {};
  #cartProducts: Tables<
    Array<{
      idProduct: Product['id'];
      date: Date;
    }>
  > = {};
  //#endregion

  //#region Methods
  //USERS
  logIn({ email, password }: { email: string; password: string }) {
    const user: User | undefined = Object.values(this.#users).find(user => {
      if (user.email === email && user.password === password) return user;
    });
    if (!!user) {
      user.password = '';
      this.#userlogged = user;
    } else throw new Error('User not found');
  }
  logOut() {
    if (!!this.#userlogged) this.#userlogged = null;
    else throw new Error('User not logged');
  }
  signUp({ email, password }: { email: string; password: string }) {
    const userExist = Object.values(this.#users).find(user => user.email === email);
    if (userExist) throw new Error('User already exist');

    let id = uuidv4();
    this.#users[id] = {
      email,
      password,
      id,
      isActive: true,
      name: '',
      lastname: '',
      phone: '',
      address: { street: '', city: '', state: '', zip: '' },
      isVendor: false,
    };
  }
  deleteUser() {
    if (!!this.#userlogged) {
      this.#users[this.#userlogged.id].isActive = false;
      this.#userlogged = null;
    } else throw new Error('User not logged');
  }
  getUserLogged() {
    if (!!this.#userlogged) return this.#userlogged;
    else throw new Error('User not logged');
  }
  upgradeUserToSeller() {
    if (!!this.#userlogged) {
      this.#userlogged.isVendor = true;
      this.#users[this.#userlogged.id].isVendor = true;
    } else throw new Error('User not logged');
  }
  //PRODUCTS
  createCategory(name: Category['name']) {
    const categoryList = this.getCategoryList();
    const categoryFound = categoryList.find(category => category.name === name);
    if (!!categoryFound) throw new Error('Category already exists');

    const id = uuidv4();
    const newCategory = { id, name };
    this.#categories[id] = newCategory;
    this.#saveCategoriesToCache();
    return newCategory;
  }

  #saveCategoriesToCache() {
    localStorage.setItem('categories', JSON.stringify(this.#getCategories()));
  }

  #getCategories() {
    return this.#categories;
  }

  getCategoryList() {
    const fileredCategories = Object.values(this.#getCategories()).filter(category => !category.deleted);
    return fileredCategories;
  }

  getCategory(id: Category['id']) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');
    return categories[id];
  }

  removeCategory(id: Category['id']) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');
    categories[id].deleted = true;
    this.#saveCategoriesToCache();
    return categories[id];
  }

  updateCategory({ id, name }: { id: Category['id']; name: Category['name'] }) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');

    categories[id].name = name;
    this.#saveCategoriesToCache();
    return categories[id];
  }

  createOrder(idProducts: Array<Product['id']>) {}

  emptyCart(idCart: Cart['id']) {
    if (this.#userlogged) {
      const cart = this.#carts[idCart];
      if (!cart) throw new Error('Cart not found');
      delete this.#cartProducts[idCart];
      delete this.#carts[idCart];
      delete this.#userCarts[this.#userlogged.id];
      delete this.#cartUser[idCart];
    } else throw new Error('User not logged');
  }

  checkout() {
    if (!this.#userlogged) throw new Error('User not logged');
    const idCart = this.#userCarts[this.#userlogged.id];
    if (!idCart) throw new Error('Cart not found');
    const products = this.#cartProducts[idCart];
    const idProducts = products.map(product => product.idProduct);
    this.createOrder(idProducts);
    this.emptyCart(idCart);
  }

  addProductToStore() {}
  removeProductFromStore() {}
  getProducts() {}

  getProduct() {}

  addCategory() {}
  deleteCategory() {}
  //CART
  addProductToCart() {}
  removeProductFromCart() {}
  checkOut() {}

  getOrders() {}
  deleteOrder() {}
  removeProductFromOrder() {}
  // #endregion
}
