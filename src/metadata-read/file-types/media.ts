import FilePropertyBuilder from './file';

/**
 * This class can me used for any type of media. However, if the
 * file type being read is an image or video, use {@link ImagePropertyBuilder}
 * or {@link VideoPropertyBuilder}
 */
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
