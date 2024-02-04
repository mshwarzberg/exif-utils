import { exifUtil } from '../values';

describe('tests the json output of exiftool listings', () => {
	it('tests json results of all available tags', () => {
		const allTags = exifUtil.jsonInfo().listAllTagsSync();
		expect(allTags.length).toBeGreaterThan(0);
		const namePattern = /^[A-Za-z0-9_-]+$/;
		allTags.forEach((item) =>  {
			expect(item).toMatch(namePattern);
		});
	});

	it('tests json results of all writable files', () => {
		const writableFileTypes = exifUtil.jsonInfo().listWritableFileTypesSync();
		expect(writableFileTypes.length).toBeGreaterThan(0);

		const namePattern = /^[A-Za-z0-9]+$/;
		const validLengths = [2, 3, 4];

		writableFileTypes.forEach((item) =>  {
			expect(item).toMatch(namePattern);
			expect(validLengths).toContain(item.length);
		});
	});

	it('tests json results of deletable groups', () => {
		const deletableGroups = exifUtil.jsonInfo().listDeletableGroups();
		expect(deletableGroups.length).toBeGreaterThan(0);
		const namePattern = /^[A-Za-z0-9-*_]+$/;
		deletableGroups.forEach((item) =>  {
			expect(item).toMatch(namePattern);
		});
	});

	it('tests json results of all available tags', () => {
		const allTags = exifUtil.jsonInfo().listAllTagsSync();
		expect(allTags.length).toBeGreaterThan(0);
		const namePattern = /^[A-Za-z0-9_-]+$/;
		allTags.forEach((item) =>  {
			expect(item).toMatch(namePattern);
		});
	});
});
