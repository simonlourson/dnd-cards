import { SvgElement } from "./SvgElement";
import { SvgPath } from "./SvgPath";

export class SvgGroup extends SvgElement {
  children = new Map<string, SvgElement>()
  outerHtml: string

  constructor(svgGroupElement: SVGGElement) {
    super(svgGroupElement)

    this.outerHtml = svgGroupElement.outerHTML

    for (let svgIndex = 0; svgIndex < svgGroupElement.children.length; svgIndex++) {
      const child = svgGroupElement.children.item(svgIndex)
      if (child instanceof SVGGElement)
        this.children.set(child.id, new SvgGroup(child))
      else if (child instanceof SVGPathElement)
        this.children.set(child.id, new SvgPath(child))
    }
  }

  getItem(id: string): SvgElement | undefined {
    for (let child of Array.from(this.children.values())) {
      if (child.id == id) return child
      else if (child instanceof SvgGroup) {
        const isInGroup = child.getItem(id)
        if (isInGroup) return isInGroup
      }
    }
  }

  override getHtml(): string {
    return this.outerHtml.replace(`id="${this.id}"`, `id="${this.id}" transform="translate(${-this.bbox.x},${-this.bbox.y})"`)
  }
}