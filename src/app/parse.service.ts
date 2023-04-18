import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  last_parsed: any;

  getCurrent(): any {
    return this.last_parsed;
  }

  parseHadesFile(f: string): any {

    console.log(f)

    let o: any = {
      components: this.parseComponents(this.extractBlock(f, "components")),
      signals: this.extractBlock(f, "signals"),
      name: this.extractName(f)
    }
    this.last_parsed = 0;
    return o

  }

  extractBlock(f: string, s: string): string[] {
    // @ts-ignore
    return f
      .match(new RegExp(`\\[${s}](.*)\\[end ${s}]`, "gs"))[0]
      .replaceAll(/(\[[^\[\]}]*])/gs, "")
      .trim()
      .split(/[\n\r]+/)
      .filter(e => e !== "")

  }

  extractName(f: string): string {
    let l = f.trim().split(/[\n\r]+/)
    return l[2].split(/\s+/)[1]

  }

  parseComponents(lines: string[]): any {
    return lines
      .map(e => e.trim().split(/\s+/))
      .map(e => {
        return {
          typ: e[0],
          coords: {
            x: e[2],
            y: e[3]
          },
          name: e[1],
          // E[6] ChatGPT behauptet, es wäre der delay der komponente. ergibt sinn für mich
          delay: e[6]
        }
      })
  }

}
