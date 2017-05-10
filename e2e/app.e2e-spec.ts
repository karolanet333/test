import { SOFCO.AppPage } from './app.po';

describe('SOFCO.app App', () => {
  let page: SOFCO.AppPage;

  beforeEach(() => {
    page = new SOFCO.AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
