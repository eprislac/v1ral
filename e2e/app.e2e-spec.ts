import { ViralPage } from './app.po';

describe('viral App', function() {
  let page: ViralPage;

  beforeEach(() => {
    page = new ViralPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
