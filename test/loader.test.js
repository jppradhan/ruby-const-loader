/**
 * @jest-environment node
 */
import compiler from "./compiler.js";

test("Inserts name and outputs JavaScript", async () => {
  const stats = await compiler("index.js");
  const outputs = stats.toJson({ source: true }).modules;

  expect(outputs[1].source).toBe(
    `export const DEVICES={ANDROID:'android',IOS:'ios',};\nexport const APP_STORE={IOS:'iTunes',ROKU:'Roku',ANDROID:'Google Play',};\nexport const PLATFORMS={apple: 'apple',roku: 'roku',android: 'android',amazon: 'amazon',};\nexport const APPLE="apple";\nexport const ANDROID='android';\nexport const ANDROID_TV='android-tv'`
  );
});
