import FilePropertyBuilder from "./file";

export default class ImagePropertyBuilder extends FilePropertyBuilder {
    public withImageWidth(): ImagePropertyBuilder {
        this.withProperties("ImageWidth");
        return this;
    }
    
    public withImageHeight(): ImagePropertyBuilder {
        this.withProperties("ImageHeight");
        return this;
    }
    
    public withImageSize(): ImagePropertyBuilder {
        this.withProperties("ImageSize");
        return this;
    }
    
    public withMegapixels(): ImagePropertyBuilder {
        this.withProperties("Megapixels");
        return this;
    }
}