import { SvgElement } from "./SvgElement";

export class SvgPath extends SvgElement {
  d: string
  fill: string

  constructor(svgPathElement: SVGPathElement) {
    super(svgPathElement)

    this.d = svgPathElement.getAttribute('d') || ''
    this.fill = svgPathElement.getAttribute('fill') || '#000'
    this.bbox = svgPathElement.getBBox()
  }

  override getHtml(): string {
    return `<path transform="translate(${-this.bbox.x},${-this.bbox.y})" d="${this.d}" fill="${this.fill}"/>`
  }
}