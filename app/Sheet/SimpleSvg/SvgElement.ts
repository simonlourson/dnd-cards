export abstract class SvgElement {
  id: string
  bbox: DOMRect

  constructor(sdsd: SVGGraphicsElement) {
    this.id = sdsd.id
    this.bbox = sdsd.getBBox()
  }

  abstract getHtml(): string

  getImageHtml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?><svg width="${this.bbox.width}mm" height="${this.bbox.height}mm" version="1.1" viewBox="0 0 ${this.bbox.width} ${this.bbox.height}" xmlns="http://www.w3.org/2000/svg">${this.getHtml()}</svg>`
  }
}