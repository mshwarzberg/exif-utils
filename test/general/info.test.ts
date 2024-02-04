import { exifUtil } from '../values';

describe('tests general info', () => {
	it('tests the version sync', () => {
		expect(exifUtil.getVersionSync().startsWith('error')).toBeFalsy();
		expect(parseFloat(exifUtil.getVersionSync())).toBeTruthy();
	});

	it('tests the version async', async () => {
		expect((await exifUtil.getVersionAsync()).startsWith('error')).toBeFalsy();
		expect(parseFloat(await exifUtil.getVersionAsync())).toBeTruthy();
	});
});
