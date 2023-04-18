import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {


  parseHadesFile(f: string): any {
    console.log(f)

    return {
      components:this.extractBlock(f,"components"),
      signals:this.extractBlock(f,"signals"),
      name: this.extractName(f)
    }

  }

  extractBlock(f:string,s:string):string[]{
    // @ts-ignore
    return f
      .match(new RegExp(`\\[${s}](.*)\\[end ${s}]`,"gs"))[0]
      .replaceAll(/(\[[^\[\]}]*])/gs,"")
      .trim()
      .split(/[\n\r]+/)
      .filter(e => e !== "")

  }
  extractName(f:string):string{
    let l = f.trim().split(/[\n\r]+/)
    return l[2].split(/\s+/)[1]

  }

}
