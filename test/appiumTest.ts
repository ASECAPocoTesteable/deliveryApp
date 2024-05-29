import wd from 'wd';
import { strict as assert } from 'assert';

describe('Delivery App Tests', function () {
  this.timeout(300000);

  let driver: wd.PromiseWebdriver;

  before(async () => {
    driver = wd.promiseChainRemote('http://localhost:4723/wd/hub');
    await driver.init({
      platformName: 'Android',
      deviceName: 'emulator-5562',
      app: '/path/to/your/app.apk',
    });
  });

  after(async () => {
    await driver.quit();
  });

  it('should display deliveries', async () => {
    const deliveries = await driver.elementsByClassName('android.widget.TextView');
    assert(deliveries.length > 0);
  });

  it('should mark a delivery as delivered', async () => {
    const button = await driver.elementByAccessibilityId('Mark as Delivered');
    await button.click();
    const confirmation = await driver.elementByClassName('android.widget.Toast');
    assert(confirmation);
  });
});