import FilePropertyBuilder from './file-types/file';

export default class MediaPropertyBuilder extends FilePropertyBuilder {
	public withImageWidth(): this {
		this.withProperties('ImageWidth');
		return this;
	}

	public withImageHeight(): this {
		this.withProperties('ImageHeight');
		return this;
	}

	public withImageSize(): this {
		this.withProperties('ImageSize');
		return this;
	}

	public withMegapixels(): this {
		this.withProperties('Megapixels');
		return this;
	}
}
