Feature('Product Detail');

Scenario('I can browse product page', (I, productsPage) => {
  I.amOnPage(productsPage.url);
  I.wait(1);
  I.seeElement('.ReactVirtualized__Grid a[href^="/products/"]', 'which is a product link');
  I.click('.ReactVirtualized__Grid a[href^="/products/"]');
  I.seeInCurrentUrl('/products/');
  I.waitForElement('.product-tabs', 5);
  I.see('Information');
  I.see('BIM Data');
  I.see('Resources');
});
