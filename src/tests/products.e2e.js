Feature('Products');

Scenario('I can browse product page', (I, productsPage) => {
  I.amOnPage(productsPage.url);
  I.wait(1);
  I.see('All Products');
  I.seeElement(productsPage.viewIcons.grid);
  I.seeElement(productsPage.viewIcons.list);
  I.seeElement(productsPage.viewIcons.hybrid);
});

Scenario('I can see product grid in product page', (I, productsPage) => {
  I.amOnPage(productsPage.url);
  I.waitForElement('.ReactVirtualized__Grid', 5);
  I.waitForElement('.ReactVirtualized__Grid a[href^="/products/"]', 5);
});
