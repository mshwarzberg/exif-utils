import MediaPropertyBuilder from './media';

export default class VideoPropertyBuilder extends MediaPropertyBuilder {
	public withDuration(): this {
		this.withProperties('Duration');
		return this;
	}

	public withFrameCount(): this {
		this.withProperties('FrameCount');
		return this;
	}

	public withVideoFrameRate(): this {
		this.withProperties('VideoFrameRate');
		return this;
	}

	public withVideoFrameCount(): this {
		this.withProperties('VideoFrameCount');
		return this;
	}

	public withAvgBitrate(): this {
		this.withProperties('AvgBitrate');
		return this;
	}

	public withMaxBitrate(): this {
		this.withProperties('MaxBitrate');
		return this;
	}
}
